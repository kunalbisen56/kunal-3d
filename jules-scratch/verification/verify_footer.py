from playwright.sync_api import Page, expect

def test_footer_contact_button_removed(page: Page):
    """
    This test verifies that the 'Contact' button has been removed from the footer.
    """
    # 1. Arrange: Go to the homepage.
    page.goto("http://localhost:3000/", timeout=60000)

    # 2. Act: Locate the footer and check for the "Contact" button within it.
    footer = page.locator("footer")
    footer.scroll_into_view_if_needed()

    # Wait for the footer to be visible
    expect(footer).to_be_visible(timeout=10000)

    # 3. Assert: Check that the 'Contact' button is not present in the footer.
    contact_button = footer.get_by_role("button", name="Contact")
    expect(contact_button).not_to_be_visible()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
