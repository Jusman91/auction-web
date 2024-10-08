import { ISendMailParams } from '../../types';
import { createMailOptions } from './mailOptions';
import { createTransport } from './transport';

export const sendEmail = async (
	params: ISendMailParams,
) => {
	const { to, subject, btnText, url } = params;
	try {
		const transport = createTransport();
		const mailOptions = createMailOptions({
			to,
			subject,
			btnText,
			url,
		});

		const result = await new Promise((resolve, reject) => {
			transport.sendMail(mailOptions, (err, info) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					console.log('Sent mail', info.response);
					resolve(info);
				}
			});
		});
		console.log('Sent mail', result);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
