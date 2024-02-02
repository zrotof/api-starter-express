//Import models

/*
const { Ambassador } =  require('./ambassador');
const { ArticleRubric } =  require('./article_rubric');
const { Article } =  require('./article');
const { EventType } = require('./event-type');
const { Event } = require('./event');
const { Replay } =  require('./replay');
const { User } =  require('./user');
const { Live } = require('./live');
const { LoginAttempt } = require('./login-attempt');
const { UserTokenPasswordReset } = require('./user-token-password-reset');
*/

/*
const models = {
  Ambassador,
  ArticleRubric,
  Article,
  EventType,
  Event,
  Live,
  LoginAttempt,
  Replay,
  User,
  UserTokenPasswordReset
}
*/

//Set relationshipbetween tables

/*
Article.belongsTo(ArticleRubric, {
  foreignKey : 'rubricId'
})

Article.belongsTo(User, {
  foreignKey : 'userId'
})

Event.belongsTo(Article, {
  foreignKey : 'articleId'
})
  
Event.belongsTo(EventType, {
  foreignKey : 'eventTypeId'
})

ArticleRubric.belongsTo(User, {
  foreignKey : 'userId'
})

Live.belongsTo(Event, {
  foreignKey : 'eventId'
})
*/

module.exports = models;