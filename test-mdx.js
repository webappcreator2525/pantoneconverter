const { serialize } = require('next-mdx-remote/serialize');

async function run() {
  try {
    const res = await serialize('<FAQSection num={1 + 1} />');
    console.log(res.compiledSource);
  } catch(e) {
    console.error(e);
  }
}

run();
