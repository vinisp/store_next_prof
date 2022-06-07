import { useState, useEffect } from 'react'

import ElementProvider from 'contexts/Checkout'

import StepBox from 'components/StepBox'
import Checkout from 'components/Checkout'
import Info from 'components/Info'

import * as S from './styles'

export interface ProfileProps {
  display_name?: string
  e_mail?: string
  e_mail_valid?: string
  card_number?: string
  card_month?: string
  card_year?: string
  code?: string
  doc?: string
  issuer?: string
  slt_installment?: number
}

export interface SectionProps {
  screen: number
  id?: number
}

function TemplateHome() {
  //const cardNumberRef = useRef(false)
  const [useSection, setSection] = useState<SectionProps>({ screen: 1 })
  const [useProfile, setProfile] = useState<ProfileProps>({})
  const [useTerms, setTerms] = useState(false)
  //const { card_number = '', issuer } = useProfile

  const [useInstallments, setInstallments] = useState([
    {
      installments: 1,
      recommended_message: 'Parcelas'
    }
  ])

  useEffect(() => {
    window.onload = () => {
      function checkFn() {
        window.Mercadopago.setPublishableKey(
          'TEST-aba171f0-8e97-4301-a4b1-ab93ad231a8f'
        )
        window.Mercadopago.getIdentificationTypes()
      }
      checkFn()

      setTimeout(() => {
        if (!window.Mercadopago.initialized) {
          checkFn()
          console.log('Reconectando...')
        }
      }, 1000)
    }
  }, [])

  return (
    <S.Wrapper>
      <S.Content>
        <S.Main>
          <ElementProvider
            {...{
              useSection,
              setSection,
              useProfile,
              setProfile,
              useInstallments,
              setInstallments,
              useTerms,
              setTerms
            }}
          >
            <StepBox />
            <Info />
            <Checkout />
          </ElementProvider>
        </S.Main>
      </S.Content>
    </S.Wrapper>
  )
}

export default TemplateHome
