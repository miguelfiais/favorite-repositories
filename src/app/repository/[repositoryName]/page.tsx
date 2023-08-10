import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import ListIssues from '../components/ListIssues'

interface ResponseDataProps {
  full_name: string
  owner: {
    avatar_url: string
    login: string
  }
  name: string
  description: string
}
export interface ResponseIssuesProps {
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
      <ListIssues
        responseIssues={responseIssues}
        repositoryName={decodeURIComponent(params.repositoryName)}
      />
    </div>
  )
}

export default Repository
