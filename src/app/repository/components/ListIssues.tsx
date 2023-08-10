'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ResponseIssuesProps } from '../[repositoryName]/page'
import Button from './Button'

const ListIssues = ({
  responseIssues,
  repositoryName,
}: {
  responseIssues: ResponseIssuesProps[]
  repositoryName: string
}) => {
  const [page, setPage] = useState(1)
  const [state, setState] = useState('all')
  const [issues, setIssues] = useState(responseIssues)

  const handlePage = (action: string) => {
    setPage(action === 'back' ? page - 1 : page + 1)
  }

  const handleState = (state: string) => {
    setState(state)
  }

  useEffect(() => {
    const loadIssues = async () => {
      const response = (await fetch(
        `https://api.github.com/repos/${decodeURIComponent(
          repositoryName
        )}/issues?per_page=5&state=${state}&page=${page}`
      ).then((res) => res.json())) as ResponseIssuesProps[]
      setIssues(response)
    }
    loadIssues()
  }, [page, repositoryName, state])

  return (
    <>
      <div className="flex gap-2 mt-5">
        <Button active={state === 'all'} onClick={() => handleState('all')}>
          Todas
        </Button>
        <Button active={state === 'open'} onClick={() => handleState('open')}>
          Abertas
        </Button>
        <Button
          active={state === 'closed'}
          onClick={() => handleState('closed')}
        >
          Fechadas
        </Button>
      </div>
      <ul className="mt-8 pt-8 border">
        {issues.map((issue) => (
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
      <div className="flex justify-between items-center mt-3">
        <Button onClick={() => handlePage('back')} disabled={page < 2}>
          Voltar
        </Button>
        <Button onClick={() => handlePage('next')}>Próximo</Button>
      </div>
    </>
  )
}

export default ListIssues
