import { faker } from '@faker-js/faker'
import 'cypress-file-upload'

describe('songs on client', () => {
  it('should read a song', () => {
    cy.visit('/songs')
cy.get('button').eq(0).click()


    cy.get('li > a').eq(0).click()
  })

  // it('should create a song', () => {
  //   cy.visit('/songs')
  //   cy.get('a').contains('Upload new').click()
  //   cy.url().should('include', '/songs/create')

  //   cy.get('input[name="title"]').type(faker.music.songName())
  //   cy.get('input[name="artist"]').type(
  //     faker.lorem.word({ length: { min: 1, max: 7 } })
  //   )
  //   cy.get('input[name="genre"]').type(faker.music.genre())

  //   cy.fixture('image.jpg').then((imageContent) => {
  //     cy.get('input[type="file"]').eq(0).attachFile({
  //       fileContent: imageContent,
  //       fileName: 'image.jpg',
  //       mimeType: 'image/jpeg',
  //     })
  //   })

  //   cy.fixture('audio.mp3').then((audioContent) => {
  //     cy.get('input[type="file"]').eq(1).attachFile({
  //       fileContent: audioContent,
  //       fileName: 'audio.mp3',
  //       mimeType: 'audio/mp3',
  //     })
  //   })

  //   cy.get('button[type="submit"]').click()
  //   cy.contains('Song successfully created').should('exist')
  // })
})
