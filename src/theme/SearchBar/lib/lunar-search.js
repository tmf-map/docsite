// eslint-disable-next-line
import lunr from 'lunr';

lunr.tokenizer.separator = /[\s\-/]+/;

class LunrSearchAdapter {
  constructor(searchData) {
    this.searchData = searchData;
    this.init();
    this.titleHitsRes = [];
  }

  init() {
    const {searchData} = this;
    this.lunrIndex = lunr(function () {
      this.ref('id');
      this.field('title', {boost: 200});
      this.field('content', {boost: 2});
      this.field('keywords', {boost: 100});
      this.metadataWhitelist = ['position'];
      searchData.forEach((d, i) => {
        const doc = {
          id: i,
          title: d.title,
          content: d.content,
          keywords: d.keywords
        };
        this.add(doc);
      });
    });
  }

  getLunrResult(input) {
    return this.lunrIndex.query(function (query) {
      const tokens = lunr.tokenizer(input);
      query.term(tokens, {
        boost: 10
      });
      query.term(tokens, {
        wildcard: lunr.Query.wildcard.TRAILING
      });
    });
  }

  getHit(doc, formattedTitle, formattedContent) {
    return {
      hierarchy: {
        lvl0: doc.pageTitle || doc.title,
        lvl1: doc.type === 0 ? null : doc.title
      },
      url: doc.url,
      _snippetResult: formattedContent
        ? {
            content: {
              value: formattedContent,
              matchLevel: 'full'
            }
          }
        : null,
      _highlightResult: {
        hierarchy: {
          lvl0: {
            value: doc.type === 0 ? formattedTitle || doc.title : doc.pageTitle
          },
          lvl1:
            doc.type === 0
              ? null
              : {
                  value: formattedTitle || doc.title
                }
        }
      }
    };
  }

  getTitleHit(doc, position, length) {
    const start = position[0];
    const end = position[0] + length;
    const formattedTitle = `${doc.title.substring(
      0,
      start
    )}<span class="algolia-docsearch-suggestion--highlight">${doc.title.substring(
      start,
      end
    )}</span>${doc.title.substring(end, doc.title.length)}`;
    return this.getHit(doc, formattedTitle);
  }

  getKeywordHit(doc, position, length) {
    const start = position[0];
    const end = position[0] + length;
    const formattedTitle = `${
      doc.title
    }<br /><i>Keywords: ${doc.keywords.substring(
      0,
      start
    )}<span class="algolia-docsearch-suggestion--highlight">${doc.keywords.substring(
      start,
      end
    )}</span>${doc.keywords.substring(end, doc.keywords.length)}</i>`;
    return this.getHit(doc, formattedTitle);
  }

  getContentHit(doc, position) {
    const start = position[0];
    const end = position[0] + position[1];
    let previewStart = start;
    let previewEnd = end;
    let ellipsesBefore = true;
    let ellipsesAfter = true;
    // eslint-disable-next-line
    for (let k = 0; k < 3; k++) {
      const nextSpace = doc.content.lastIndexOf(' ', previewStart - 2);
      const nextDot = doc.content.lastIndexOf('.', previewStart - 2);
      if (nextDot > 0 && nextDot > nextSpace) {
        previewStart = nextDot + 1;
        ellipsesBefore = false;
        break;
      }
      if (nextSpace < 0) {
        previewStart = 0;
        ellipsesBefore = false;
        break;
      }
      previewStart = nextSpace + 1;
    }
    // eslint-disable-next-line
    for (let k = 0; k < 10; k++) {
      const nextSpace = doc.content.indexOf(' ', previewEnd + 1);
      const nextDot = doc.content.indexOf('.', previewEnd + 1);
      if (nextDot > 0 && nextDot < nextSpace) {
        previewEnd = nextDot;
        ellipsesAfter = false;
        break;
      }
      if (nextSpace < 0) {
        previewEnd = doc.content.length;
        ellipsesAfter = false;
        break;
      }
      previewEnd = nextSpace;
    }
    let preview = doc.content.substring(previewStart, start);
    if (ellipsesBefore) {
      preview = `... ${preview}`;
    }
    preview += `<span class="algolia-docsearch-suggestion--highlight">${doc.content.substring(
      start,
      end
    )}</span>`;
    preview += doc.content.substring(end, previewEnd);
    if (ellipsesAfter) {
      preview += ' ...';
    }
    return this.getHit(doc, null, preview);
  }

  search(input) {
    return new Promise(resolve => {
      const results = this.getLunrResult(input);
      const hits = [];
      // eslint-disable-next-line
      results.length > 5 && (results.length = 5);
      this.titleHitsRes = [];
      this.contentHitsRes = [];
      results.forEach(result => {
        const doc = this.searchData[result.ref];
        const {metadata} = result.matchData;
        // eslint-disable-next-line
        for (const i in metadata) {
          if (metadata[i].title) {
            if (!this.titleHitsRes.includes(result.ref)) {
              const position = metadata[i].title.position[0];
              hits.push(this.getTitleHit(doc, position, input.length));
              this.titleHitsRes.push(result.ref);
            }
          } else if (metadata[i].content) {
            const position = metadata[i].content.position[0];
            hits.push(this.getContentHit(doc, position));
          } else if (metadata[i].keywords) {
            const position = metadata[i].keywords.position[0];
            hits.push(this.getKeywordHit(doc, position, input.length));
            this.titleHitsRes.push(result.ref);
          }
        }
      });
      // eslint-disable-next-line
      hits.length > 5 && (hits.length = 5);
      resolve(hits);
    });
  }
}

export default LunrSearchAdapter;
