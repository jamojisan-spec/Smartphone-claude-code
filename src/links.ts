export interface ExternalLink {
  label: string;
  url: string;
}

// itamae.fun（板前.fun）への導線をまとめた設定。
// アフィリエイトリンクなど確定したURLが決まったら、ここを書き換えるだけで反映される。
export const links = {
  home: {
    label: "板前.funを見る",
    url: "https://itamae.fun/",
  } satisfies ExternalLink,

  category: {
    技術: {
      label: "「技術」の記事をもっと読む",
      url: "https://itamae.fun/",
    } satisfies ExternalLink,
    知識: {
      label: "「知識」の記事をもっと読む",
      url: "https://itamae.fun/",
    } satisfies ExternalLink,
    心構え: {
      label: "「心構え」の記事をもっと読む",
      url: "https://itamae.fun/",
    } satisfies ExternalLink,
  },

  // ミニゲームごとに関連する記事へのリンク。
  minigame: {
    knife: {
      label: "包丁と砥石について読む",
      url: "https://itamae.fun/",
    } satisfies ExternalLink,
  },

  credit: {
    label: "運営者パプリカ先輩について",
    url: "https://itamae.fun/",
  } satisfies ExternalLink,
};

export function openLink(link: ExternalLink): void {
  window.open(link.url, "_blank", "noopener,noreferrer");
}
