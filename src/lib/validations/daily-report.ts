import { z } from 'zod';

/**
 * 日報フォームのバリデーションスキーマ
 *
 * バリデーションルール：
 * - 稼働日の場合は時間とメーター値が必須
 * - 終了時間は開始時間より後
 * - メーター値は0〜999999の範囲
 * - 配送件数は0〜999の範囲
 */
export const dailyReportSchema = z
  .object({
    date: z.string().min(1, '日付は必須です'),
    is_worked: z.boolean(),
    start_time: z
      .string()
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        '正しい時刻形式で入力してください'
      )
      .optional(),
    end_time: z
      .string()
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        '正しい時刻形式で入力してください'
      )
      .optional(),
    start_odometer: z
      .number()
      .min(0, 'メーター値は0以上で入力してください')
      .max(999999, 'メーター値は999999以下で入力してください')
      .optional(),
    end_odometer: z
      .number()
      .min(0, 'メーター値は0以上で入力してください')
      .max(999999, 'メーター値は999999以下で入力してください')
      .optional(),
    deliveries: z
      .number()
      .min(0, '配送件数は0以上で入力してください')
      .max(999, '配送件数は999以下で入力してください')
      .optional(),
    highway_fee: z
      .number()
      .min(0, '高速料金は0以上で入力してください')
      .optional(),
    notes: z
      .string()
      .max(500, '備考は500文字以下で入力してください')
      .optional(),
  })
  // 稼働日の場合の必須項目チェック
  .refine(
    (data) => {
      if (data.is_worked) {
        return (
          data.start_time &&
          data.end_time &&
          data.start_odometer !== undefined &&
          data.end_odometer !== undefined
        );
      }
      return true;
    },
    {
      message:
        '稼働日は開始時間、終了時間、開始メーター、終了メーターの入力が必要です',
      path: ['is_worked'],
    }
  )
  // 時間の妥当性チェック
  .refine(
    (data) => {
      if (data.start_time && data.end_time) {
        return data.end_time > data.start_time;
      }
      return true;
    },
    {
      message: '終了時間は開始時間より後の時刻を入力してください',
      path: ['end_time'],
    }
  )
  // メーター値の妥当性チェック
  .refine(
    (data) => {
      if (
        data.start_odometer !== undefined &&
        data.end_odometer !== undefined
      ) {
        return data.end_odometer >= data.start_odometer;
      }
      return true;
    },
    {
      message: '終了メーターは開始メーター以上の値を入力してください',
      path: ['end_odometer'],
    }
  );

/**
 * 日報フォームデータの型定義
 */
export type DailyReportFormData = z.infer<typeof dailyReportSchema>;

/**
 * 日報作成用のデータ型定義
 * フォームデータからデータベース保存用に変換
 */
export type CreateDailyReportData = {
  user_id: string;
  date: string;
  is_worked: boolean;
  start_time?: string;
  end_time?: string;
  start_odometer?: number;
  end_odometer?: number;
  deliveries?: number;
  highway_fee?: number;
  notes?: string;
};

/**
 * 距離計算用のユーティリティ関数
 * メーターが一周した場合も考慮
 */
export function calculateDistance(
  startOdometer: number | undefined,
  endOdometer: number | undefined
): number {
  if (startOdometer === undefined || endOdometer === undefined) {
    return 0;
  }

  if (endOdometer >= startOdometer) {
    // 通常の場合
    return endOdometer - startOdometer;
  } else {
    // メーターが999999を超えて一周した場合
    return 999999 - startOdometer + endOdometer + 1;
  }
}

/**
 * 時間差計算用のユーティリティ関数
 * HH:MM形式の時間から時間数を計算
 */
export function calculateWorkingHours(
  startTime: string | undefined,
  endTime: string | undefined
): number {
  if (!startTime || !endTime) {
    return 0;
  }

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMinute;
  let endMinutes = endHour * 60 + endMinute;

  // 日をまたぐ場合（例：23:00 - 01:00）
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60;
  }

  return (endMinutes - startMinutes) / 60;
}
