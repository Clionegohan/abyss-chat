export const formatZodErrors = (err: any): string[] => {
    if (err?.name === 'ZodError' && Array.isArray(err.errors)) {
        return err.errors.map((e: any) => e.message);
    }
    return [err?.message || '不明なエラーが発生しました。'];
};
