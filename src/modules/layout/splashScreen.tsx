import { ProgressSpinner } from 'primereact/progressspinner'
export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
      <img src="vite.svg" alt="Project Logo" className="w-24 h-24" />
      <h1 className="text-blue-500 text-2xl font-bold my-4">Enjoy Spot CMS</h1>
        <ProgressSpinner />
    </div>
  )
}
