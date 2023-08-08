'use client'

import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { FaPlus, FaSpinner } from 'react-icons/fa'

interface ResponseApiProps {
  full_name: string
}

const Form = () => {
  const [newRepo, setNewRepo] = useState('')
  const [repositories, setRepositories] = useState<ResponseApiProps[]>([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRepo(e.target.value)
  }

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()

      const fetchRepository = async () => {
        setLoading(true)
        try {
          const response = await fetch(
            `https://api.github.com/repos/${newRepo}`
          )
          const data = (await response.json()) as ResponseApiProps
          setRepositories([...repositories, data])
          setNewRepo('')
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      fetchRepository()
    },

    [newRepo, repositories]
  )

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
      <input
        type="text"
        placeholder="Adicionar Repositórios"
        className="flex-1 border rounded py-2 px-3 text-base outline-none"
        value={newRepo}
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
  )
}

export default Form
