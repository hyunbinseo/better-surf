import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

void describe('brandconnect.naver.com', () => {
	void test('placeholder affiliate ID resolves', async () => {
		const url = 'https://brandconnect.naver.com/affiliates/0?channelProductNo=0000000000';
		const response = await fetch(url);
		assert.equal(response.status, 200);
		assert.match(response.headers.get('content-type') ?? '', /text\/html/);
	});
});
