import useSWRMutation from 'swr/mutation'

type ResponseData = {
    message: string
}

async function subscribeToNewsletter(url: string, options: Readonly<{arg: {email: string}}>) {
    return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: options.arg.email }),
    })
    .then(res => {
        if (res.status >= 400) {
            throw new Error('Network call failed')
        }
        return res
    })
    .then(res => res.json() as Promise<ResponseData>)
}

export const useSubscribeToNewsletter = () => {
    const { trigger: subscribe, isMutating: loading, error, data } = useSWRMutation('/api/newsletter/subscribe', subscribeToNewsletter, {throwOnError: false})

    return {
        subscribe,
        loading,
        error,
        data,
    }
}

