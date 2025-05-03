export default defineBackground(() => {
	browser.contextMenus.create({
		id: 'save-image-as-png',
		title: '이미지를 PNG로 저장',
		contexts: ['image'],
	});

	browser.contextMenus.onClicked.addListener(async (info) => {
		if (info.menuItemId === 'save-image-as-png' && info.srcUrl) {
			try {
				const response = await fetch(info.srcUrl);
				if (!response.ok) return;

				if (response.headers.get('content-type') === 'image/png') {
					browser.downloads.download({ filename: 'original.png', url: info.srcUrl });
					return;
				}

				const blob = await response.blob();
				const img = await createImageBitmap(blob);

				const canvas = new OffscreenCanvas(img.width, img.height);
				const ctx = canvas.getContext('2d')!;
				ctx.drawImage(img, 0, 0, img.width, img.height);

				browser.downloads.download({
					filename: 'converted.png',
					url: await canvas.convertToBlob().then((blob) =>
						typeof URL.createObjectURL === 'function'
							? URL.createObjectURL(blob)
							: new Promise<string>((resolve, reject) => {
									const reader = new FileReader();
									reader.onloadend = () => resolve(reader.result as string);
									reader.onerror = () => reject();
									reader.readAsDataURL(blob);
								}),
					),
				});
			} catch {}
		}
	});
});
