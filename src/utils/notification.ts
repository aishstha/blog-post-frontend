import { toast } from 'react-toastify';

import { messageStatus } from '../constants/messageStatus';
import { notificationDefaultMessage } from '../constants/applicationMessage';

/**
 * Get a object of react-toastify which will be our notification block.
 *
 * @param  {string}  type
 * @param  {string}  message
 * @return {any}
 */

export const notify = (type, message) => {
  switch (type) {
    case messageStatus.SUCCESS:
      toast.success(message || notificationDefaultMessage.SUCCESS, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      break;
    case messageStatus.ERROR:
      toast.error(message || notificationDefaultMessage.ERROR, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      break;
    case messageStatus.WARN:
      toast.warn(message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      break;
    case messageStatus.INFO:
      toast.info(message, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      break;
  }
};
