import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { FaBars, FaTrash } from 'react-icons/fa'

interface ResponseApiProps {
  full_name: string
}

interface ListProps {
  repositories: ResponseApiProps[]
  setRepositories: Dispatch<SetStateAction<ResponseApiProps[]>>
}

const List = ({ repositories, setRepositories }: ListProps) => {
  const handleDelete = useCallback(
    (repo: string) => {
      const newRepositories = repositories.filter((r) => r.full_name !== repo)
      setRepositories(newRepositories)
    },
    [repositories, setRepositories]
  )

  //Buscar no localStorage
  useEffect(() => {
    const repositoriesInLocalStorage: string | null =
      localStorage.getItem('repos')
    if (repositoriesInLocalStorage) {
      setRepositories(JSON.parse(repositoriesInLocalStorage))
    }
  }, [setRepositories])

  //Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositories))
  }, [repositories])

  return (
    <ul className="mt-5">
      {repositories.map((repo) => (
        <li
          key={repo.full_name}
          className="py-3 flex items-center justify-between border-b"
        >
          <span className="flex items-center gap-2">
            <button
              onClick={() => {
                handleDelete(repo.full_name)
              }}
              className="text-blue-950"
            >
              <FaTrash size={14} />
            </button>
            {repo.full_name}
          </span>
          <a className="text-blue-950">
            <FaBars size={20} />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default List
