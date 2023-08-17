import { messageService } from './';

describe('MessageService', (): void => {
  it('Generate message from content', async () => {
    const content = 'hello hello!';
    const result = await messageService.generateMessageKey(content);

    console.log(result);
  });
});

