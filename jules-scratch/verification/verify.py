from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000/services")
    page.screenshot(path="/app/jules-scratch/verification/services.png")
    browser.close()
