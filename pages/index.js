import Image from 'next/image'
import Dashboard from './components/molecules/Dashboard';
import Navigation from './components/molecules/Navigation';
export default function Home() {
  return (
    <>
    <Navigation/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dashboard/>
    </main>
    </>
  )
}
