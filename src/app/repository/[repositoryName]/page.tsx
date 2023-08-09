import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

interface ResponseDataProps {
  full_name: string
  owner: {
    avatar_url: string
    login: string
  }
  name: string
  description: string
}
interface ResponseIssuesProps {
  id: Number
  user: {
    avatar_url: string
    login: string
  }
  name: string
  html_url: string
  title: string
  labels: {
    id: Number
    name: string
  }[]
}

const fetchRepository = async (repositoryName: string) => {
  const [responseData, responseIssues]: [
    ResponseDataProps,
    ResponseIssuesProps[]
  ] = await Promise.all([
    fetch(
      `https://api.github.com/repos/${decodeURIComponent(repositoryName)}`
    ).then((res) => res.json()),
    fetch(
      `https://api.github.com/repos/${decodeURIComponent(
        repositoryName
      )}/issues?per_page=5`
    ).then((res) => res.json()),
  ])

  return [responseData, responseIssues]
}

const Repository = async ({
  params,
}: {
  params: { repositoryName: string }
}) => {
  const [responseData, responseIssues] = (await fetchRepository(
    decodeURIComponent(params.repositoryName)
  )) as [ResponseDataProps, ResponseIssuesProps[]]

  return (
    <div className="max-w-3xl bg-white rounded shadow-md p-8 my-20 mx-auto">
      <Link href={'/'} className="text-blue-950">
        <FaArrowLeft size={30} />
      </Link>
      <div className="flex flex-col items-center">
        <Image
          src={responseData.owner.avatar_url}
          alt={responseData.owner.login}
          width={150}
          height={150}
          className="rounded-full my-5"
        />
        <h1 className="text-3xl text-blue-950">{responseData.name}</h1>
        <p className="mt-1 text-sm text-center max-w-md">
          {responseData.description}
        </p>
      </div>
      <div>
        <ul className="mt-8 pt-8 border">
          {responseIssues.map((issue) => (
            <li
              key={String(issue.id)}
              className="flex items-center py-4 px-2 mb-3"
            >
              <Image
                src={issue.user.avatar_url}
                alt={issue.user.login}
                width={36}
                height={36}
                className="rounded-full border-2 border-blue-950"
              />
              <div className="flex-1 ml-3">
                <strong className="text-sm">
                  <a
                    href={issue.html_url}
                    className="text-gray-700 hover:text-blue-500"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map((label) => (
                    <span
                      key={String(label.id)}
                      className="bg-gray-700 text-white rounded text-xs py-1 px-2 ml-2"
                    >
                      {label.name}
                    </span>
                  ))}
                </strong>
                <p className="mt-2 text-xs">{issue.user.login}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Repository
