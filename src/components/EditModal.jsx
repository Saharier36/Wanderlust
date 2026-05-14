"use client";

import { Pencil } from "@gravity-ui/icons";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  Input,
  Label,
  Modal,
  TextField,
  Select,
  ListBox,
  TextArea,
  Surface,
} from "@heroui/react";

export function EditModal({ destination }) {
  const {
    _id,
    destinationName,
    country,
    price,
    departureDate,
    imageUrl,
    description,
    duration,
    category,
  } = destination;

  const modalRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedDestination = Object.fromEntries(formData.entries());

    const res = await fetch(`http://localhost:5000/destinations/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDestination),
    });

    if (res.ok) {
      console.log("Destination updated successfully");
      modalRef.current?.close();
      router.refresh();
    } else {
      alert("Failed to update destination");
    }
  };

  return (
    <Modal ref={modalRef}>
      <Modal.Trigger>
        <Button variant="outline" size="sm" className="rounded-none">
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </Button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="w-full max-w-2xl mx-4 sm:mx-auto rounded-none">
            <Modal.CloseTrigger />

            <Modal.Header className="px-6 pt-6 pb-0">
              <Modal.Heading className="text-xl font-semibold">
                Edit Destination
              </Modal.Heading>
              <p className="mt-1 text-sm text-gray-400">
                Update the destination details below.
              </p>
            </Modal.Header>

            <Modal.Body className="px-6 py-5">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Destination Name */}
                    <div className="sm:col-span-2">
                      <TextField
                        defaultValue={destinationName}
                        name="destinationName"
                        isRequired
                      >
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Destination Name
                        </Label>
                        <Input
                          placeholder="Bali Paradise"
                          className="rounded-lg w-full"
                        />
                        <FieldError className="text-xs text-red-500 mt-1" />
                      </TextField>
                    </div>

                    {/* Country */}
                    <TextField defaultValue={country} name="country" isRequired>
                      <Label className="text-sm font-medium text-gray-700 mb-1 block">
                        Country
                      </Label>
                      <Input
                        placeholder="Indonesia"
                        className="rounded-lg w-full"
                      />
                      <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    {/* Category */}
                    <Select
                      defaultValue={category}
                      name="category"
                      isRequired
                      className="w-full"
                      placeholder="Select category"
                    >
                      <Label className="text-sm font-medium text-gray-700 mb-1 block">
                        Category
                      </Label>
                      <Select.Trigger className="rounded-lg w-full">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {[
                            "Beach",
                            "Mountain",
                            "City",
                            "Adventure",
                            "Cultural",
                            "Luxury",
                          ].map((cat) => (
                            <ListBox.Item key={cat} id={cat} textValue={cat}>
                              {cat}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    {/* Price */}
                    <TextField defaultValue={price} name="price" isRequired>
                      <Label className="text-sm font-medium text-gray-700 mb-1 block">
                        Price (USD)
                      </Label>
                      <Input
                        type="number"
                        placeholder="1299"
                        className="rounded-lg w-full"
                      />
                      <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    {/* Duration */}
                    <TextField
                      defaultValue={duration}
                      name="duration"
                      isRequired
                    >
                      <Label className="text-sm font-medium text-gray-700 mb-1 block">
                        Duration (days)
                      </Label>
                      <Input
                        type="number"
                        placeholder="7"
                        className="rounded-lg w-full"
                      />
                      <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    {/* Departure Date */}
                    <div className="sm:col-span-2">
                      <TextField
                        defaultValue={
                          new Date(departureDate).toISOString().split("T")[0]
                        }
                        name="departureDate"
                        isRequired
                      >
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Departure Date
                        </Label>
                        <Input type="date" className="rounded-lg w-full" />
                        <FieldError className="text-xs text-red-500 mt-1" />
                      </TextField>
                    </div>

                    {/* Image URL */}
                    <div className="sm:col-span-2">
                      <TextField
                        defaultValue={imageUrl}
                        name="imageUrl"
                        isRequired
                      >
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Image URL
                        </Label>
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          className="rounded-lg w-full"
                        />
                        <FieldError className="text-xs text-red-500 mt-1" />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-2">
                      <TextField
                        defaultValue={description}
                        name="description"
                        isRequired
                      >
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Description
                        </Label>
                        <TextArea
                          placeholder="Describe the travel experience..."
                          className="rounded-lg w-full min-h-25"
                        />
                        <FieldError className="text-xs text-red-500 mt-1" />
                      </TextField>
                    </div>
                  </div>
                  <Modal.Footer>
                    {/* Buttons */}
                    <Button
                      slot="close"
                      type="submit"
                      className="rounded-none w-full bg-cyan-600 text-white font-semibold"
                    >
                      Save Changes
                    </Button>
                    <Button
                      slot="close"
                      variant="outline"
                      className="rounded-none"
                    >
                      Cancel
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
