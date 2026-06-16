import re
from bs4 import BeautifulSoup

def main():
    try:
        with open('faq_page.html', 'r', encoding='utf-8') as f:
            html = f.read()
            
        soup = BeautifulSoup(html, 'html.parser')
        items = soup.find_all('details', class_='e-n-accordion-item')
        
        faqs = []
        for item in items:
            q_elem = item.find('div', class_='e-n-accordion-item-title-text')
            a_elem = item.find('div', class_='elementor-widget-text-editor')
            if q_elem:
                q_text = q_elem.get_text(strip=True)
                a_text = a_elem.get_text(strip=True) if a_elem else ''
                faqs.append((q_text, a_text))
                
        # Also check for other accordion widgets or structures
        if not faqs:
            # Fallback regex search for question-like titles
            titles = re.findall(r'class=\"e-n-accordion-item-title-text\"\s*>(.*?)</div>', html)
            for title in titles:
                faqs.append((title.strip(), ''))
                
        with open('faqs_extracted.md', 'w', encoding='utf-8') as out:
            out.write('# Extracted FAQs\n\n')
            for i, (q, a) in enumerate(faqs, 1):
                out.write(f'### {q}\n')
                out.write(f'{a}\n\n')
                
        print(f'Successfully extracted {len(faqs)} FAQs to faqs_extracted.md')
    except Exception as e:
        print(f'Error: {e}')

if __name__ == '__main__':
    main()
