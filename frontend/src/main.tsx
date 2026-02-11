import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WelcomeScreen from './WelcomeScreen.tsx'
import TalkToSomeoneScreen from './TalkToSomeoneScreen.tsx'
import EverythingGoodScreen from './EverythingGoodScreen.tsx'
import ChooseYourBondScreen from './ChooseYourBondScreen.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WelcomeScreen />
    <TalkToSomeoneScreen/>
    <EverythingGoodScreen/>
    <ChooseYourBondScreen/>

  </StrictMode>,
)
