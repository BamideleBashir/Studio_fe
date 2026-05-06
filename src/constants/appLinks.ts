// Set live URLs via .env (VITE_*_URL). Fallback values are local dev ports.
export const APP_LINKS = {
  binocule: import.meta.env.VITE_BINOCULE_URL || "https://binocule.vercel.app",
  nucleus:
    import.meta.env.VITE_NUCLEUS_URL || "https://nucleus-binocule.vercel.app",
  digitizer:
    import.meta.env.VITE_DIGITIZER_URL ||
    "https://digitizer-binocule.vercel.app",
  studio:
    import.meta.env.VITE_STUDIO_URL || "https://studio-binocule.netlify.app",
};
