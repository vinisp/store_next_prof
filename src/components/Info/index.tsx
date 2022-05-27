import IconInfo from 'app/icons/FilledInfo'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import * as S from './styles'

function Info() {
  const [price, getPrice] = useState()
  const [name, getName] = useState()
  const [resume, getResume] = useState()
  const route = useRouter()
  const GetPrice = async () => {
    const query = route.query.cid

    useEffect(() => {
      query
        ? axios
            .get(`https://deppback.herokuapp.com/course/${query}`)
            .then((response) => {
              getPrice(response.data[0].price)
              getName(response.data[0].name)
              getResume(response.data[0].main_resume)
            })
            .catch((err) => console.error(err))
        : console.log(false)

      return console.log(`https://deppback.herokuapp.com/course/${query}`)
    }, [query])
  }

  GetPrice()
  return (
    <S.Wrapper>
      <S.Content>
        <S.Head>
          <S.Title>Premium</S.Title>
          <a target="_blank" href="#">
            <IconInfo fill="#616161" />
          </a>
        </S.Head>
        <S.Pricebox>
          <S.Price>R$ {price}</S.Price>
          <S.Coin>BRL</S.Coin>
        </S.Pricebox>
        <S.About>
          <S.Name>{name}</S.Name>
          <S.Description>{resume}</S.Description>
        </S.About>
      </S.Content>
    </S.Wrapper>
  )
}

export default Info
