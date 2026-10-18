// Web3Forms leitet Formulare als E-Mail an Stephanie weiter – ganz ohne eigenen Server
export const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export async function sendForm(fields: Record<string, FormDataEntryValue | string | null>) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: web3formsKey, from_name: "Website Pirouettentraum", ...fields }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
}

export const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 outline-none transition focus:border-accent focus:ring-4 focus:ring-ice/30";
