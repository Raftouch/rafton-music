import { faker } from '@faker-js/faker'
import 'cypress-file-upload'

describe('songs on client', () => {
  beforeEach(() => {
    cy.login('rafa', '1234')
  })

  it('should create a song', () => {
    cy.get('a').contains('Upload new').click()
    cy.url().should('include', '/songs/create')
    cy.get('input[name="title"]').type(faker.music.songName())
    cy.get('input[name="artist"]').type('Madonna')
    cy.get('input[name="genre"]').type('Pop')
    cy.get('input[type="file"]')
      .eq(0)
      .selectFile('cypress/fixtures/image.jpg', { force: true })
    cy.get('input[type="file"]')
      .eq(1)
      .selectFile('cypress/fixtures/audio.mp3', { force: true })
    cy.get('button[type="submit"]').click()
    cy.contains('Song successfully created').should('be.visible')
  })

  it('should read a song', () => {
    cy.get('li > a').eq(0).click()
    cy.get('[data-cy="song-details"]').should('exist')
    cy.get('button').eq(1).click()
    cy.get('[data-cy="player"]').should('be.visible')
    cy.wait(5000)
    cy.get('[data-cy="duration-value"]').should('not.have.value', '0')
  })

  it('should update a song', () => {
    cy.get('button').eq(2).click()
    cy.url().should('include', '/songs/edit')
    cy.get('[data-cy="input-title"]').clear().type(faker.music.songName())
    cy.get('button[type="submit"]').click()
    cy.contains('Song successfully updated').should('be.visible')
  })

  it('should delete a song', () => {
    cy.get('button').eq(3).click()
    cy.get('div > h1').contains('Are you sure?').should('be.visible')
    cy.get('button').contains('Yes').click()
    cy.contains('Song successfully removed').should('be.visible')
  })
})
