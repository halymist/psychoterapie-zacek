// Run through Playwright MCP browser_run_code_unsafe with this filename after
// opening the built site. A fresh browser keeps Chromium's navigation flood
// protection enabled (Playwright normally disables it).
async (page) => {
  const browser = await page.context().browser().browserType().launch({
    headless: true,
    ignoreDefaultArgs: ['--disable-ipc-flooding-protection']
  });
  try {
    const test = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const warnings = [];
    test.on('console', message => {
      if (message.type() === 'warning') warnings.push(message.text());
    });
    await test.goto(page.url().split('#')[0]);
    const links = await test.locator('nav a').evaluateAll(elements =>
      elements.map(element => element.getBoundingClientRect().toJSON()));
    const click = rect => test.mouse.click(rect.x + rect.width / 2, rect.y + rect.height / 2);
    const check = async hash => {
      await test.waitForFunction(expected => location.hash === expected, hash);
      await test.waitForFunction(expected => {
        const root = document.documentElement;
        const target = document.querySelector(expected);
        const y = Math.min(scrollY + target.getBoundingClientRect().top -
          parseFloat(getComputedStyle(root).scrollPaddingTop), root.scrollHeight - innerHeight);
        return Math.abs(scrollY - Math.max(0, y)) < 3;
      }, hash, { timeout: 3000 });
    };

    for (let i = 0; i < 230; i++) await click(links[i % links.length]);
    await check('#cenik');
    await click(links[0]);
    await check('#omne');
    await test.goBack();
    await check('#cenik');
    await test.goForward();
    await check('#omne');

    await test.emulateMedia({ reducedMotion: 'reduce' });
    const education = test.locator('nav a[href="#vzdelani"]');
    await education.focus();
    await test.keyboard.press('Enter');
    await check('#vzdelani');
    if (warnings.some(message => message.includes('Throttling navigation'))) {
      throw new Error('Rapid navigation triggered the browser flood guard.');
    }
    return { passed: true, checks: ['230 rapid clicks', 'next click responds', 'Back/Forward', 'keyboard and reduced motion'] };
  } finally {
    await browser.close();
  }
}
