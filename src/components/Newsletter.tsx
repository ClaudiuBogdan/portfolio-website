import { useEffect, useRef } from "react"
import { useSubscribeToNewsletter } from "@/adapters/api"
import en from "@/locales/en.json"
import { useNotification } from "@/modules/notifications"
import { Button } from "./Button"
import { MailIcon } from "./Icons/MailIcon"

const text = en.components.newsletter

export function Newsletter() {
  const { subscribe, loading, error, data } = useSubscribeToNewsletter()
  const { addNotification } = useNotification()
  const addNotificationRef = useRef(addNotification) // to avoid triggering useEffect on addNotification change
  addNotificationRef.current = addNotification

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    return subscribe({ email })
  }

  useEffect(() => {
    if (error) {
      addNotificationRef.current({
        title: text.errorNotification.title,
        message: text.errorNotification.description,
        type: "error",
        autoClose: true,
      })
    }
  }, [error])

  useEffect(() => {
    if (data) {
      addNotificationRef.current({
        title: text.successNotification.title,
        message: text.successNotification.description,
        type: "success",
        autoClose: true,
      })
    }
  }, [data])

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">{text.title}</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {text.description}
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
          {text.cta}
        </Button>
      </div>
    </form>
  )
}
