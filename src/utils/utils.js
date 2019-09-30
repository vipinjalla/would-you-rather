export function _createActionCreator(type) {
    return function(payload, meta) {
        const action = {type};

        if (typeof payload !== 'undefined') {
            action.payload = payload;
        }

      return action;
    };
}

export {_createActionCreator as createActionCreator};


export const getMyQuestions = (author, questionsList=[]) => {
	return questionsList.filter(question => {
  		return question.author === author;
	});
};

export const getOthersQuestions = (author, questionsList=[]) => {
	return questionsList.filter(question => {
  		return question.author !== author;
	});
};

export const getAnsweredQuestions = (author, questionsList={}) => {
	return getOthersQuestions(author, Object.values(questionsList)).filter(question => {
  		return question && (question.optionOne.votes.includes(author) || question.optionTwo.votes.includes(author));
	});
};

export const getUnansweredQuestions = (author, questionsList={}) => {
	return getOthersQuestions(author, Object.values(questionsList)).filter(question => {
  		return question && (!question.optionOne.votes.includes(author) && !question.optionTwo.votes.includes(author));
	});
};

export const getMyAnswer = (author, question) => {
  	if (question.optionOne.votes.includes(author)) {
    	return question.optionOne;
    }
	return question.optionTwo;
};
