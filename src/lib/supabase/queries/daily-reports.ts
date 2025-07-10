import { supabase } from '../client';
import type { DailyReport, DailyReportForm } from '@/types/database';
import type { CreateDailyReportData } from '@/lib/validations/daily-report';

/**
 * 日報関連のSupabaseクエリ関数
 *
 * 提供機能：
 * - 日報の作成、読取、更新、削除（CRUD操作）
 * - 月間レポートの集計
 * - 最新メーター値の取得
 */

/**
 * 日報を作成
 * @param data 日報作成データ
 * @returns 作成された日報
 */
export async function createDailyReport(
  data: CreateDailyReportData
): Promise<DailyReport> {
  const { data: report, error } = await supabase
    .from('daily_reports')
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error('日報作成エラー:', error);
    throw new Error(`日報の作成に失敗しました: ${error.message}`);
  }

  return report;
}

/**
 * 特定の日付の日報を取得
 * @param userId ユーザーID
 * @param date 日付（YYYY-MM-DD形式）
 * @returns 日報データまたはnull
 */
export async function getDailyReportByDate(
  userId: string,
  date: string
): Promise<DailyReport | null> {
  const { data: report, error } = await supabase
    .from('daily_reports')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .single();

  if (error) {
    // レコードが見つからない場合はnullを返す
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('日報取得エラー:', error);
    throw new Error(`日報の取得に失敗しました: ${error.message}`);
  }

  return report;
}

/**
 * 日報を更新
 * @param id 日報ID
 * @param data 更新データ
 * @returns 更新された日報
 */
export async function updateDailyReport(
  id: number,
  data: Partial<CreateDailyReportData>
): Promise<DailyReport> {
  const { data: report, error } = await supabase
    .from('daily_reports')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('日報更新エラー:', error);
    throw new Error(`日報の更新に失敗しました: ${error.message}`);
  }

  return report;
}

/**
 * 日報を削除
 * @param id 日報ID
 */
export async function deleteDailyReport(id: number): Promise<void> {
  const { error } = await supabase.from('daily_reports').delete().eq('id', id);

  if (error) {
    console.error('日報削除エラー:', error);
    throw new Error(`日報の削除に失敗しました: ${error.message}`);
  }
}

/**
 * ユーザーの日報一覧を取得
 * @param userId ユーザーID
 * @param options クエリオプション
 * @returns 日報配列
 */
export async function getDailyReports(
  userId: string,
  options: {
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
    isWorked?: boolean;
  } = {}
): Promise<DailyReport[]> {
  let query = supabase
    .from('daily_reports')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  // 期間フィルター
  if (options.startDate) {
    query = query.gte('date', options.startDate);
  }
  if (options.endDate) {
    query = query.lte('date', options.endDate);
  }

  // 稼働状況フィルター
  if (options.isWorked !== undefined) {
    query = query.eq('is_worked', options.isWorked);
  }

  // ページネーション
  if (options.limit) {
    query = query.limit(options.limit);
  }
  if (options.offset) {
    query = query.range(
      options.offset,
      options.offset + (options.limit || 50) - 1
    );
  }

  const { data: reports, error } = await query;

  if (error) {
    console.error('日報一覧取得エラー:', error);
    throw new Error(`日報一覧の取得に失敗しました: ${error.message}`);
  }

  return reports || [];
}

/**
 * 最新のメーター値を取得
 * @param userId ユーザーID
 * @returns 最新の終了メーター値またはnull
 */
export async function getLastOdometerReading(
  userId: string
): Promise<number | null> {
  const { data: report, error } = await supabase
    .from('daily_reports')
    .select('end_odometer')
    .eq('user_id', userId)
    .not('end_odometer', 'is', null)
    .order('date', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    // レコードが見つからない場合はnullを返す
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('最新メーター値取得エラー:', error);
    return null;
  }

  return report?.end_odometer || null;
}

/**
 * 月間統計を取得
 * @param userId ユーザーID
 * @param year 年
 * @param month 月
 * @returns 月間統計データ
 */
export async function getMonthlyStats(
  userId: string,
  year: number,
  month: number
): Promise<{
  workingDays: number;
  totalDistance: number;
  totalDeliveries: number;
  totalTollFee: number;
  totalHours: number;
}> {
  const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
  const endDate = `${year}-${month.toString().padStart(2, '0')}-31`;

  const { data: reports, error } = await supabase
    .from('daily_reports')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate);

  if (error) {
    console.error('月間統計取得エラー:', error);
    throw new Error(`月間統計の取得に失敗しました: ${error.message}`);
  }

  // 統計計算
  const workingReports = reports?.filter((r) => r.is_worked) || [];

  const stats = {
    workingDays: workingReports.length,
    totalDistance: workingReports.reduce(
      (sum, r) => sum + (r.distance_km || 0),
      0
    ),
    totalDeliveries: workingReports.reduce(
      (sum, r) => sum + (r.deliveries || 0),
      0
    ),
    totalTollFee: workingReports.reduce((sum, r) => sum + (r.toll_fee || 0), 0),
    totalHours: 0, // TODO: 時間計算を実装
  };

  return stats;
}

/**
 * 日報が既に存在するかチェック
 * @param userId ユーザーID
 * @param date 日付
 * @returns 存在する場合はtrue
 */
export async function isDailyReportExists(
  userId: string,
  date: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('daily_reports')
    .select('id')
    .eq('user_id', userId)
    .eq('date', date)
    .single();

  if (error && error.code === 'PGRST116') {
    return false;
  }

  return data !== null;
}

/**
 * 日報作成・更新のヘルパー関数
 * 既存の日報があれば更新、なければ作成
 * @param formData フォームデータ
 * @param userId ユーザーID
 * @returns 作成または更新された日報
 */
export async function upsertDailyReport(
  formData: DailyReportForm,
  userId: string
): Promise<DailyReport> {
  // 既存の日報をチェック
  const existingReport = await getDailyReportByDate(userId, formData.date);

  const reportData: CreateDailyReportData = {
    user_id: userId,
    date: formData.date,
    is_worked: formData.is_worked,
    start_time: formData.start_time,
    end_time: formData.end_time,
    start_odometer: formData.start_odometer,
    end_odometer: formData.end_odometer,
    deliveries: formData.deliveries,
    toll_fee: formData.toll_fee,
    notes: formData.notes,
  };

  if (existingReport) {
    // 更新
    return await updateDailyReport(existingReport.id, reportData);
  } else {
    // 作成
    return await createDailyReport(reportData);
  }
}
