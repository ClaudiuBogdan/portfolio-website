import Image from "next/image"

import { Button } from "@/components/Button"
import { ArrowDownIcon } from "@/components/Icons/ArrowDownIcon"
import { BriefcaseIcon } from "@/components/Icons/BriefcaseIcon"
import en from "@/locales/en.json"
import { mapLogo } from "./Logos"

type Role = {
  company: string
  title: string
  start: string
  end: string | "present"
}

const workExperiences = en.workExperiences

const resume = en.resume

function getDateLabel(date: string) {
  if (date === "present") {
    return "Present"
  }

  return date
}

function getDateTime(date: string) {
  if (date === "present") {
    const currentYear = new Date().getFullYear()
    return String(currentYear)
  }

  return date
}

function getRoleUniqueKey(role: Role) {
  return `${role.company}-${role.title}-${role.start}-${role.end}`
}

export function Resume() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {workExperiences.map((role) => (
          <li key={getRoleUniqueKey(role)} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={mapLogo(role.logo)}
                alt={role.logo}
                className="h-7 w-7"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-200">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-500 dark:text-zinc-400"
                aria-label={`${getDateLabel(role.start)} until ${getDateLabel(
                  role.end
                )}`}
              >
                <time dateTime={getDateTime(role.start)}>
                  {getDateLabel(role.start)}
                </time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time dateTime={getDateTime(role.end)}>
                  {getDateLabel(role.end)}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href={resume.link}
        variant="secondary"
        className="group mt-6 w-full"
      >
        {resume.label}
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}
