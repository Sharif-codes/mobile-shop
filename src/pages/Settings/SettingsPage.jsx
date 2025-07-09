import { useDispatch, useSelector } from 'react-redux';
import { THEMES } from '../../constants';
import { setTheme } from './themeSlice';


const SettingsPage = () => {
    const theme = useSelector((state) => state.theme.value)
    console.log("selected theme is:", theme);
    const dispatch = useDispatch()
    return (
        <div className=" container mx-auto px-4 pt-20 max-w-5xl ">
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">Theme</h2>
                    <p className="text-sm text-base-content/70">Choose a theme for your interface</p>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {THEMES.map((t) => (
                        <button
                            key={t}
                            className={` group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100 ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
                            onClick={() => dispatch(setTheme(t))}
                        >
                            <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                                <div className="absolute inset-0 grid grid-cols-4 gap-[2px] p-1">
                                    <div className="rounded bg-primary"></div>
                                    <div className="rounded bg-secondary"></div>
                                    <div className="rounded bg-accent"></div>
                                    <div className="rounded bg-neutral"></div>
                                </div>
                            </div>
                            <span className="text-[11px] font-medium truncate w-full text-center">
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;