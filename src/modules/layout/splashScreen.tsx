import { ProgressSpinner } from 'primereact/progressspinner'
export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
      <img src="EnjoySpot.svg" alt="Project Logo" className="w-[40vw] h-[40vh]" />
        <ProgressSpinner />
    </div>
  )
}
