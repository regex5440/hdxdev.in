import submitMessage from "@/actions/form";
import { Check, Loader2 } from "lucide-react";
import { memo, useActionState, useEffect, useState } from "react";
import Script from "next/script";
import { useFormStatus } from "react-dom";
import UserInfoInput from "./UserInfoInput";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const FormButton = memo(function Button({
  success,
  disabled,
}: {
  success: boolean;
  disabled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="bg-blue-500 text-white py-2 px-10 rounded-md text-lg disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <div className="animate-spin">
          <Loader2 />
        </div>
      ) : success ? (
        <Check />
      ) : (
        "Send"
      )}
    </button>
  );
});

export default function ComponentForm() {
  const [formValue, setFormValue] = useState({
    fullname: "",
    email: "",
    message: "Could you provide me credentials to access & test your projects?",
  });
  const [formData, formAction] = useActionState(submitMessage, undefined);
  const [showFormTick, setShowFormTick] = useState(false);

  useEffect(() => {
    if (formData?.success) {
      setShowFormTick(true);

      if (typeof window !== "undefined" && window.turnstile) {
        window.turnstile.reset();
      }

      setTimeout(() => {
        setFormValue((state) => ({
          ...state,
          fullname: "",
          email: "",
          message: "",
        }));
        setShowFormTick(false);
      }, 2000);
    }
  }, [formData]);

  return (
    <div className="w-fit mx-auto my-30 px-4">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <h2 className="text-4xl">Contact Me</h2>
      <p className="text-xl mt-4">
        Feel free to reach out to me for any queries or collaborations.
      </p>
      <form
        className="flex flex-col gap-10 w-[90%] mt-10 [&_input,&_textarea]:bg-gray-100"
        action={formAction}
      >
        {formData?.error && (
          <p className="text-red-500 text-lg">{formData.error}</p>
        )}
        <div
          className="relative group"
          data-invalid={(formData?.fullname?.length || 0) > 0}
        >
          <label
            htmlFor="nameFull"
            className="absolute left-2 text-lg text-slate-700 transition-all duration-300 label-placeholder"
          >
            Your name
          </label>
          <input
            type="text"
            name="fullname"
            id="nameFull"
            required
            className="w-full rounded-md px-2 py-1 outline-slate-700 group-data-[invalid=true]:border-2 border-red-600 text-black"
            value={formValue.fullname}
            onChange={(e) =>
              setFormValue({ ...formValue, fullname: e.target.value })
            }
          />
        </div>
        <div
          className="relative group"
          data-invalid={(formData?.message?.length || 0) > 0}
        >
          <label
            htmlFor="emailInput"
            className="absolute left-2 text-lg text-slate-700 transition-all duration-300 label-placeholder"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="emailInput"
            required
            className="w-full rounded-md px-2 py-1 outline-slate-700 group-data-[invalid=true]:border-2 border-red-600 text-black"
            value={formValue.email}
            onChange={(e) =>
              setFormValue({ ...formValue, email: e.target.value })
            }
          />
        </div>
        <div
          className="relative group"
          data-invalid={(formData?.message?.length || 0) > 0}
        >
          <label
            htmlFor="messageArea"
            className="absolute left-2 text-lg text-slate-700 transition-all duration-300 label-placeholder"
          >
            Your message
          </label>
          <textarea
            name="message"
            id="messageArea"
            required
            className="w-full rounded-md px-2 py-1 outline-slate-700 group-data-[invalid=true]:border-2 border-red-600 text-black"
            value={formValue.message}
            onChange={(e) =>
              setFormValue({ ...formValue, message: e.target.value })
            }
            data-empty={formValue.message.length === 0}
          />
        </div>
        <UserInfoInput />
        <div>
          <FormButton success={showFormTick} disabled={!TURNSTILE_SITE_KEY} />
          {TURNSTILE_SITE_KEY ? (
            <div
              className="cf-turnstile"
              data-sitekey={TURNSTILE_SITE_KEY}
              data-response-field-name="cf-turnstile-response"
            />
          ) : (
            <p className="text-sm text-red-500">
              Captcha is unavailable right now. Please try again later.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}
