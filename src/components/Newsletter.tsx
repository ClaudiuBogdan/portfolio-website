import { useEffect } from "react";
import { Button } from "./Button";
import { MailIcon } from "./Icons/MailIcon";
import { useSubscribeToNewsletter } from "@/adapters/api";

export function Newsletter() {

  const {subscribe, loading, error, data} = useSubscribeToNewsletter();

  console.log('loading', loading, data, error);
  
  const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    return subscribe({email})
  };

  useEffect(() => {
    if (error) {
      // TODO: show error
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      // TODO: show success
      alert('success');
    }
  }, [data]);

    return (
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      >
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <MailIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Stay up to date</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Get notified when I publish something new, and unsubscribe at any time.
        </p>
        <div className="mt-6 flex">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            aria-label="Email address"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
          />
          <Button type="submit" disabled={loading} className="ml-4 flex-none">
            Join
          </Button>
        </div>
      </form>
    )
  }
  