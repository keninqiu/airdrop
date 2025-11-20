'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
    const t = useTranslations('LanguageSwitcher');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <label className="border-2 rounded border-gray-200 bg-white/50 backdrop-blur-sm px-2 py-1">
            <p className="sr-only">{t('label')}</p>
            <select
                defaultValue={locale}
                className="bg-transparent py-1 text-sm text-gray-700 focus:outline-none cursor-pointer"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="zh">🇨🇳 中文</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="ko">🇰🇷 한국어</option>
                <option value="ru">🇷🇺 Русский</option>
                <option value="pt">🇵🇹 Português</option>
            </select>
        </label>
    );
}
