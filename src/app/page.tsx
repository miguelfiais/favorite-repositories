import { FaGithub } from 'react-icons/fa'
import Form from './components/Form'

export default function Home() {
  return (
    <div className="max-w-3xl bg-white rounded p-8 my-20 mx-auto shadow-xl">
      <h1 className="text-xl flex items-center gap-2 font-bold">
        <FaGithub size={25} />
        Meus Repositórios
      </h1>
      <Form />
    </div>
  )
}
