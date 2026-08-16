/**
 * Helper utility to smoothly scroll to any page section with an adaptive header offset calculation.
 * Prevents fixed navigation headers from covering headings, cards, or badges.
 */
export function scrollToSection(sectionId: string, customOffset?: number): void {
  const cleanId = sectionId.replace(/^#/, '');

  if (cleanId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const targetElement = document.getElementById(cleanId);
  if (!targetElement) return;

  // Dynamically calculate the floating header height and add responsive breathing room
  const headerElement = document.querySelector('header');
  const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 80;
  
  // Subtle visual offset buffer (20px extra spacing for clean card & heading presentation)
  const offsetBuffer = 20;
  const totalOffset = customOffset !== undefined ? customOffset : (headerHeight + offsetBuffer);

  const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const targetPosition = Math.max(0, elementPosition - totalOffset);

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}
