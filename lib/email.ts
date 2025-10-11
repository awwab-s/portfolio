export async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    if (data.success) {
      form.reset();
      console.log("Message sent successfully:", data);
      alert("Message sent successfully!");
    } else {
      console.error("Failed to send message:", data.error);
      alert(data.error || "Failed to send message.");
    }
  } catch (error) {
    console.error("Failed to send message:", error);
    alert("Something went wrong. Please try again.");
  }
}
