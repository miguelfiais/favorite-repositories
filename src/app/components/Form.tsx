'use client'

import { FaPlus } from 'react-icons/fa'

const Form = () => {
  return (
    <form onSubmit={() => {}} className="mt-8 flex gap-2">
      <input
        type="text"
        placeholder="Adicionar Repositórios"
        className="flex-1 border rounded py-2 px-3 text-base"
      />
      <button
        type="submit"
        className="bg-blue-950 rounded px-3 flex items-center justify-center"
      >
        <FaPlus color="#fff" size={14} />
      </button>
    </form>
  )
}

export default Form
