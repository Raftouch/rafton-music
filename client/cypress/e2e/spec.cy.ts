import { faker } from '@faker-js/faker'
import 'cypress-file-upload'

describe('songs on client', () => {
  
  it('should play a song and read details', () => {
    cy.visit('/songs')
    cy.get('button').eq(0).click()
    cy.get('[data-cy="player"]').should('be.visible')
    cy.get('[data-cy="btn-play"]').click()
    cy.wait(5000)
    cy.get('[data-cy="duration-value"]').should('not.have.value', '0')
    
    cy.get('li > a').eq(0).click()
    cy.get('[data-cy="song-details"]').should('exist')
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

    it('should update a song', () => {
      cy.visit('/songs')
      cy.get('button').eq(1).click()
      cy.url().should('include', '/songs/edit')
      cy.get('[data-cy="input-title"]').clear().type(faker.music.songName())
      cy.get('button[type="submit"]').click()
      cy.contains('Song successfully updated').should('exist')
    })

    it('should delete a song', () => {
      cy.visit('/songs')
      // cy.get('button').eq(2).click()

      // cy.contains('Song successfully removed').should('exist')
    })


  })
  