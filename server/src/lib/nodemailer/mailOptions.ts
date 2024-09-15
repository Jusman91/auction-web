import { SENDER_MAIL } from '../../config/env';
import { ISendMailParams } from '../../types';
import { generateMailOptions } from './generateMailOptions';
import { getMessageBySubject } from './getMessage';

export function createMailOptions(params: ISendMailParams) {
	const message = getMessageBySubject(params.subject);

	return generateMailOptions(params, message, SENDER_MAIL);
}
