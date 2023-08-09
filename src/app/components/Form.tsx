'use client'

import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { FaPlus, FaSpinner } from 'react-icons/fa'
import List from './List'

interface ResponseApiProps {
  full_name: string
}

const Form = () => {
  const [newRepo, setNewRepo] = useState('')
  const [repositories, setRepositories] = useState<ResponseApiProps[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRepo(e.target.value)
    setError(false)
  }

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()

      const fetchRepository = async () => {
        setLoading(true)
        setError(false)
        try {
          const response = await fetch(
            `https://api.github.com/repos/${newRepo}`
          )
          const data = (await response.json()) as ResponseApiProps

          if (!data.full_name) throw new Error('Repositório não encontrado!')

          const hasRepo = repositories.find(
            (repo) => repo.full_name === newRepo
          )

          if (hasRepo) throw new Error('Repositório já está listado!')

          setRepositories([...repositories, data])
          setNewRepo('')
        } catch (error) {
          setError(true)
        } finally {
          setLoading(false)
        }
      }

      fetchRepository()
    },

    [newRepo, repositories]
  )

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          className={`flex-1 border rounded py-2 px-3 text-base outline-none ${
            error && 'border-red-600'
          }`}
          value={newRepo}
          required
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className={`bg-blue-950 rounded px-3 flex items-center justify-center ${
            loading && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <FaSpinner className="animate-spin" color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </button>
      </form>
      <List repositories={repositories} setRepositories={setRepositories} />
    </>
  )
}

export default Form
