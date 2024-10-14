import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const formatTimeCountdown = (
  startTime: Date,
  endTime?: Date
) => {
  let timeUntilStart = '';
  let timeLeft = '';
  const sTime = dayjs(startTime);
  const eTime = endTime ? dayjs(endTime) : null;
  const now = dayjs();

  // Jika waktu sekarang masih sebelum startTime
  if (now.isBefore(sTime)) {
    const diffToStart = sTime.diff(now);
    const remainingTime = dayjs.duration(diffToStart);

    // Tampilkan waktu menuju startTime
    timeUntilStart = `${remainingTime.days()}d ${remainingTime.hours()}h ${remainingTime.minutes()}m ${remainingTime.seconds()}s`;
    timeLeft = 'Auction Not Started'; // Menampilkan pesan bahwa auction belum dimulai
  }
  // Setelah startTime berlalu
  else if (eTime && now.isBefore(eTime)) {
    const diffE = eTime.diff(now);
    const remainingTime = dayjs.duration(diffE);

    // Tampilkan sisa waktu hingga endTime
    timeLeft = `${remainingTime.days()}d ${remainingTime.hours()}h ${remainingTime.minutes()}m ${remainingTime.seconds()}s`;
    timeUntilStart = 'Auction Started';
  }
  // Jika waktu telah habis (setelah endTime)
  else {
    timeLeft = 'Auction Ended';
    timeUntilStart = ''; // Tidak perlu menampilkan waktu menuju start jika sudah berakhir
  }

  return {
    timeUntilStart,
    timeLeft
  };
};
