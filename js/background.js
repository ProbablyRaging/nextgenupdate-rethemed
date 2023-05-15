chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === 'loading' && tab.url.includes("nextgenupdate.com")) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: ngutheme,
		});
		chrome.scripting.insertCSS({
			target: { tabId: tab.id },
			files: ["css/main.css"],
		});
	}
	if (changeInfo.status === 'loading' && tab.url.includes("nextgenupdate.com") && tab.url.includes('/edit')) {
		chrome.scripting.insertCSS({
			target: { tabId: tab.id },
			files: ["css/editor.css"],
		});
	}
	if (changeInfo.status === 'loading' && tab.url.includes("nextgenupdate.com") && tab.url.includes('/members')) {
		chrome.scripting.insertCSS({
			target: { tabId: tab.id },
			files: ["css/profile.css"],
		});
	}
	if (changeInfo.status === 'loading' && tab.url.includes("nextgenupdate.com") && tab.url.includes('/messages')) {
		chrome.scripting.insertCSS({
			target: { tabId: tab.id },
			files: ["css/messages.css"],
		});
	}
	if (changeInfo.status === 'loading' && tab.url.includes("nextgenupdate.com") && tab.url.includes('/control-panel/profile')) {
		chrome.scripting.insertCSS({
			target: { tabId: tab.id },
			files: ["css/control_panel.css"],
		});
	}
});

function ngutheme() {
	// Better nav bar
	try {
		const searchBox = document.querySelector('form[action="https://nextgenupdate.com/forums/search"]');
		const upperNav = document.querySelector('nav[class="bg-ngu-blue text-white"]');
		const lowerNav = document.querySelector('nav[class="bg-ngu-blue-dark text-white hidden md:block"]');
		const upperNavButtons = document.querySelector('ul[class="ml-2.5 hidden md:flex items-center"]');
		const upperNavMain = upperNav.firstElementChild.firstElementChild.firstElementChild;
		const lowerNavMain = lowerNav.firstElementChild.firstElementChild;
		const lowerNavMainButtons = lowerNavMain.querySelectorAll('div')[0];
		const lowerNavMainDropdown = lowerNavMain.querySelectorAll('div')[7];
		const upperNavLeft = upperNav.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
		const elementsToAdjustOne = lowerNavMainButtons.querySelectorAll('li[class="relative"]');
		const elementsToAdjustTwo = lowerNavMainDropdown.querySelectorAll('li[class="relative"]');
		const elementsToAdjustThree = upperNavButtons.querySelectorAll('li[class="relative"]');
		const userDropDown = document.querySelectorAll('a[class="block w-full border-2 border-transparent mx-auto px-2.5 py-3 hover:border-b-ngu-blue-light"]')[5];
		const userAvatar = document.querySelector('img[class="mx-auto aspect-square w-[100px] h-[100px] rounded-[50%]"]');
		searchBox.remove();
		lowerNavMainButtons.style.marginLeft = '18px';
		upperNavLeft.appendChild(lowerNavMainButtons);
		upperNavMain.appendChild(upperNavButtons);
		upperNavButtons.appendChild(lowerNavMainDropdown);
		elementsToAdjustOne.forEach(element => {
			const navBtnHover = element.firstElementChild.firstElementChild;
			const oldLabel = navBtnHover.innerHTML.split(' ')[1];
			navBtnHover.innerHTML = `<span style="padding-bottom: 16px;">${oldLabel === 'Quick' ? 'Quick Links' : oldLabel} <i class="fa fa-caret-down ml-1"></i></span>`;
		});
		elementsToAdjustTwo.forEach(element => {
			const profileHover = element.firstElementChild.firstElementChild;
			const oldLabel = profileHover.innerHTML.split(' ')[1];
			profileHover.innerHTML = `<span>${oldLabel} <i class="fa fa-caret-down ml-1"></i></span>`;
		});
		elementsToAdjustThree.forEach(element => {
			const profileHover = element.firstElementChild.firstElementChild;
			const oldLabel = profileHover.innerHTML;
			profileHover.innerHTML = `<span style="padding-bottom: 16px;">${oldLabel}</span>`;
		});
		if (location.href === 'https://nextgenupdate.com/forums') {
			const homeBtn = lowerNavMainButtons.firstElementChild.firstElementChild.firstElementChild;
			homeBtn.style.backgroundColor = '#1662D4';
			homeBtn.style.padding = '4px 14px 4px 14px';
			homeBtn.style.borderRadius = '100px';
		}
		userAvatar.style.width = '26px';
		userAvatar.style.height = '26px';
		userDropDown.style.display = 'flex';
		userDropDown.style.flexDirection = 'row-reverse';
		userDropDown.style.alignItems = 'center';
		userDropDown.style.gap = '6px';
		userAvatar.parentElement.remove();
		userDropDown.appendChild(userAvatar);
	} catch (err) {
		console.log(err);
	}

	// Replace nav bar logo with text
	const navLogo = document.querySelector('img[src="/images/logo.png"]');
	const navBrandText = document.createElement('span');
	navBrandText.id = 'nav-brand-text';
	navBrandText.innerHTML = 'NextGenUpdate';
	navBrandText.style.fontSize = '18px';
	navBrandText.style.textTransform = 'uppercase';
	navLogo.replaceWith(navBrandText);

	// Facebook panel
	const facebookDiv = document.querySelector('.fb-page')
	if (facebookDiv) facebookDiv.parentElement.remove();

	// Board categories
	const boardCategories = document.querySelectorAll('.xl\\:col-span-9.lg\\:col-span-8.col-span-12');
	let catIndex = 0;
	if (boardCategories) boardCategories.forEach(category => {
		category.id = `category_${catIndex}`
	});

	// Category images
	if (location.href === 'https://nextgenupdate.com/forums') {
		const categoryImgs = document.querySelectorAll('[id^="forum_statusicon_"]');
		const newImages = [
			'https://cdn-icons-png.flaticon.com/128/630/630757.png',
			'https://cdn-icons-png.flaticon.com/128/7632/7632212.png',
			'https://cdn-icons-png.flaticon.com/128/1046/1046551.png',
			'https://cdn-icons-png.flaticon.com/128/1049/1049851.png',
			'https://cdn-icons-png.flaticon.com/128/5721/5721033.png',
			'https://cdn-icons-png.flaticon.com/128/562/562810.png',
			'https://cdn-icons-png.flaticon.com/128/1413/1413315.png',
			'https://cdn-icons-png.flaticon.com/128/2913/2913973.png',
			'https://cdn-icons-png.flaticon.com/128/3688/3688535.png',
			'https://cdn-icons-png.flaticon.com/128/2946/2946177.png',
			'https://cdn-icons-png.flaticon.com/128/1837/1837914.png',
			'https://cdn-icons-png.flaticon.com/128/295/295146.png',
			'https://cdn-icons-png.flaticon.com/128/571/571815.png',
			'https://cdn-icons-png.flaticon.com/128/316/316345.png',
			'https://cdn-icons-png.flaticon.com/128/316/316313.png',
			'https://cdn-icons-png.flaticon.com/128/1395/1395222.png',
			'https://cdn-icons-png.flaticon.com/128/350/350355.png',
			'https://cdn-icons-png.flaticon.com/128/5026/5026343.png',
			'https://cdn-icons-png.flaticon.com/128/3980/3980191.png',
			'https://cdn-icons-png.flaticon.com/128/1032/1032870.png',
			'https://cdn-icons-png.flaticon.com/128/5553/5553298.png',
			'https://cdn-icons-png.flaticon.com/128/806/806141.png',
			'https://cdn-icons-png.flaticon.com/128/2944/2944415.png',
			'https://cdn-icons-png.flaticon.com/128/224/224597.png',
			'https://cdn-icons-png.flaticon.com/128/200/200974.png',
			'https://cdn-icons-png.flaticon.com/128/299/299342.png',
			'https://cdn-icons-png.flaticon.com/128/1312/1312143.png',
			'https://cdn-icons-png.flaticon.com/128/3227/3227868.png',
		];

		let index = 0;
		if (categoryImgs) categoryImgs.forEach(image => {
			const newIdPrefix = 'category_img_';
			image.id = newIdPrefix + index;
			image.src = newImages[index];
			image.style.width = '40px';
			index++;
		});
	}

	// Hide quick post
	const quickPost = document.querySelectorAll('.border-t-4.border-t-ngu-blue.mt-5.mb-3.relative.lg\\:block.hidden');
	if (quickPost) quickPost.forEach(post => {
		const children = post.children;
		for (let i = 0; i < children.length; i++) {
			if (children[i].innerHTML.toLocaleLowerCase() === 'quick post') {
				const parentEl = children[i].parentElement;
				const parentContainer = parentEl.parentElement;
				parentContainer.appendChild(parentEl);
				break;
			}
		}
	});

	// Move sig preview under sig header in control panel
	const sigPreview = document.querySelector('.intro_block');
	const sigHeader = document.querySelector('textarea.form-control[name="signature"]');
	if (sigHeader) sigHeader.parentElement.parentElement.appendChild(sigPreview);

	// Remove user online status indicator
	const statusIndicator = document.querySelector('img[class="absolute right-[-10px] top-[-3px]"]');
	if (statusIndicator) statusIndicator.remove();

	// Move unimportant messages to bottom of inbox
	if (location.href.includes("nextgenupdate.com") && location.href.includes('/messages')) {
		const inboxPanel = document.querySelector('div[class="ms-menu"]');
		inboxPanel.style.display = 'none';
		const loadMessagesBtn = document.querySelector('a[id="js-load-message-users"]');
		const loopDelay = 50;
		let computedStyle = getComputedStyle(loadMessagesBtn);
		let clickCount = 0;
		function clickAndDelay() {
			if (clickCount > 30) {
				inboxPanel.style.display = 'block';
				return;
			}
			loadMessagesBtn.click();
			clickCount++;
			setTimeout(checkDisplayStyle, loopDelay);
		}
		function checkDisplayStyle() {
			computedStyle = getComputedStyle(loadMessagesBtn);
			if (computedStyle.display !== 'none') {
				clickAndDelay();
			} else {
				clickAndDelay();
				purgeMessages();
			}
		}
		function purgeMessages() {
			const inboxList = document.querySelector('div[id="js-message-users"]');
			const inboxMessages = inboxList.children;
			const messageIdArr = ['1', '1959384', '1301170', '1279659', '1098822'];

			for (let i = 0; i < inboxMessages.length; i++) {
				const messageId = inboxMessages[i].href.split('/').pop();
				if (!messageIdArr.includes(messageId)) {
					inboxMessages[i].remove();
				}
			}
		}
		clickAndDelay();
	}

	// Create button in online user div
	const visitProfileBtn = document.createElement('a');
	visitProfileBtn.innerHTML = 'Visit Profiles';
	visitProfileBtn.style.backgroundColor = 'rgb(17, 71, 153)';
	visitProfileBtn.style.borderRadius = '8px';
	visitProfileBtn.style.padding = '0 22px';
	visitProfileBtn.style.height = '16px';
	visitProfileBtn.style.fontSize = '10px';
	visitProfileBtn.style.float = 'right';
	visitProfileBtn.style.overflow = 'hidden';
	visitProfileBtn.style.display = 'flex';
	visitProfileBtn.style.justifyContent = 'center';
	visitProfileBtn.style.alignItems = 'center';
	visitProfileBtn.style.marginTop = '5px';
	visitProfileBtn.style.cursor = 'pointer';
	visitProfileBtn.addEventListener('click', function () {
		const a = document.querySelector('ul[class="pb-2"]');
		const links = Array.from(a.children);
		const duration = 5000;
		links.forEach((el) => {
			const url = el.firstElementChild.href;
			const newWindow = window.open(url);
			setTimeout(() => {
				newWindow.close();
			}, duration);
		});
	});
	
	const getDiv = document.querySelectorAll('div[class="absolute bg-white text-ngu-blue uppercase text-xl px-3.5 sm:ml-14 ml-4 max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap mt-[-14px]"]');
	getDiv.forEach(div => {
		if (div.innerHTML.includes('Users Online')) {
			div.appendChild(visitProfileBtn);
		}
	});
}