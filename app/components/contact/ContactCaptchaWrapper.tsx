import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function ContactCaptchaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    >
     {children}
    </GoogleReCaptchaProvider>
  );
}
