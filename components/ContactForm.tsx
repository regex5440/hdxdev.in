import submitMessage from "@/actions/form";
import { Check, Loader2 } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const FormButton = memo(function Button({ success }: { success: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-10 rounded-md text-lg"
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
  const [formData, formAction] = useFormState(submitMessage, undefined);
  const [showFormTick, setShowFormTick] = useState(false);

  useEffect(() => {
    if (formData?.success) {
      setShowFormTick(true);
      setTimeout(() => {
        setFormValue({
          fullname: "",
          email: "",
          message: "",
        });
        setShowFormTick(false);
      }, 2000);
    }
  }, [formData]);

  return (
    <div className="w-fit mx-auto mt-10 mb-12 px-4">
      <h2 className="text-4xl">Contact Me</h2>
      <p className="text-xl mt-4">
        Feel free to reach out to me for any queries or collaborations.
      </p>
      <form className="flex flex-col gap-10 w-[90%] mt-10" action={formAction}>
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
        <div>
          <FormButton success={showFormTick} />
        </div>
      </form>
    </div>
  );
}
