import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WelcomeScreen from './WelcomeScreen.tsx'
import TalkToSomeoneScreen from './TalkToSomeoneScreen.tsx'
import EverythingGoodScreen from './EverythingGoodScreen.tsx'
import ChooseYourBondScreen from './ChooseYourBondScreen.tsx'
import WaveDivider from './WaveDivider.tsx'
import ExperiencesScreen from './ExperiencesScreen.tsx'
import PricingScreen from './PricingScreen.tsx'
import ContactScreen from './ContactScreen.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WelcomeScreen />
    <TalkToSomeoneScreen/>
    <EverythingGoodScreen/>
    <WaveDivider/>
    <ChooseYourBondScreen/>
    <ExperiencesScreen/>
    <WaveDivider/>
    <PricingScreen/>
    <ContactScreen/>
  </StrictMode>,
)
