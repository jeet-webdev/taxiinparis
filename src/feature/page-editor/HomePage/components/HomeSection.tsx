// "use client";
// import { useEffect } from "react";
// import { Controller, useForm, FormProvider, Path } from "react-hook-form";
// import {
//   Button,
//   CircularProgress,
//   TextField,
//   MenuItem,
//   Typography,
//   Box,
// } from "@mui/material";
// // import { Lock, HeadsetMic, AddRoad, PriceChange } from "@mui/icons-material";
// import { SubmitHandler } from "react-hook-form";

// import Grid from "@mui/material/GridLegacy";
// import RichTextEditor from "@/src/components/common/Ui/Admin/RichTextEditor";
// import { useTransition } from "react";
// import FileUploadField from "@/src/components/common/Ui/Admin/FileUploadField";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { HomePageFormValues } from "../types/home.types";
// import { homePageSchema } from "../validations/homeSchema";
// import type { UpdatePageInput } from "@/src/actions/page/updatePage";
// import { uploadPageImage } from "@/src/actions/page/uploadPageImage";
// import { toast } from "react-toastify";
// import {
//   ICON_OPTIONS,
//   getIconComponent,
// } from "@/src/components/common/utils/iconMap";
// type Props = {
//   defaultValues: HomePageFormValues;
//   onSave?: (data: UpdatePageInput) => Promise<{ success: boolean }>;
//   pageId: number;
// };

// export default function HomePageSection({
//   defaultValues,
//   onSave,
//   pageId,
// }: Props) {
//   const methods = useForm<HomePageFormValues>({
//     defaultValues: {
//       ...defaultValues,
//     },
//     resolver: zodResolver(homePageSchema),
//     mode: "onChange",
//   });
//   const { control, handleSubmit, reset } = methods;

//   useEffect(() => {
//     if (defaultValues) {
//       reset(defaultValues);
//     }
//   }, [defaultValues, reset]);
//   // const { control, handleSubmit, watch } = methods;
//   const [isPending, startTransition] = useTransition();

//   const onSubmit: SubmitHandler<HomePageFormValues> = (data) => {
//     startTransition(async () => {
//       if (!onSave) return;

//       let imagePath: string | undefined = undefined;

//       if (data.homeHeaderImage instanceof File) {
//         const formData = new FormData();
//         formData.append("image", data.homeHeaderImage);

//         const uploadRes = await uploadPageImage(pageId, formData);
//         if (uploadRes?.success && uploadRes.publicPath) {
//           imagePath = uploadRes.publicPath;
//         } else {
//           toast.error("Image upload failed.");
//           return;
//         }
//       } else if (typeof data.homeHeaderImage === "string") {
//         imagePath = data.homeHeaderImage;
//       } else {
//         imagePath = (defaultValues.homeHeaderImage as string) || undefined;
//       }

//       const result = await onSave({
//         ...data,
//         title: data.title,
//         imageUpload: imagePath,
//         imageAlt: data.imageAlt,
//         secureBooking: data.secureBooking,
//         reliableService: data.reliableServices,
//         secureBookingIcon: data.secureBookingIcon,
//         reliableServiceIcon: data.reliableServiceIcon,
//         customerServiceIcon: data.customerServiceIcon,
//         fairPriceIcon: data.fairPriceIcon,
//         secureBookingTitle: data.secureBookingTitle,
//         reliableServiceTitle: data.reliableServiceTitle,
//         customerServiceTitle: data.customerServiceTitle,
//         fairPriceTitle: data.fairPriceTitle,
//         customerService: data.customerServices,
//         fairPrice: data.fairPrice,
//         metaTitle: data.metaTitle,
//         metaDescription: data.metaDescription,
//         metaKeywords: data.metaKeywords,
//         status: data.status,
//       });

//       if (result.success) {
//         toast.success("Home page updated successfully!");
//       }
//     });
//   };
//   const IconTitleRow = ({
//     name,
//     iconName,
//     placeholder,
//   }: {
//     name: Path<HomePageFormValues>;
//     iconName: string;
//     placeholder: string;
//   }) => {
//     const IconComponent = getIconComponent(iconName);
//     return (
//       <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
//         <IconComponent sx={{ fontSize: 32, color: "#E7C27D" }} />
//         <Controller
//           name={name}
//           control={control}
//           render={({ field, fieldState }) => (
//             <TextField
//               {...field}
//               value={field.value ?? ""}
//               fullWidth
//               placeholder={placeholder}
//               error={!!fieldState.error}
//               helperText={fieldState.error?.message}
//             />
//           )}
//         />
//       </Box>
//     );
//   };

//   return (
//     <FormProvider {...methods}>
//       <Box
//         mb={3}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Typography variant="h5">Edit Home Page</Typography>
//       </Box>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Controller
//               name="homeHeaderImage"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <FileUploadField
//                   label="Header Image"
//                   accept="image/*"
//                   files={field.value || null}
//                   error={!!fieldState.error}
//                   errorMessage={fieldState.error?.message}
//                   onChange={(files) => {
//                     const file = Array.isArray(files) ? files[0] : files;
//                     field.onChange(file ?? null);
//                   }}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="imageAlt"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   value={field.value ?? ""}
//                   fullWidth
//                   label="Image Alt Text"
//                   placeholder="Enter image alt text"
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
//               Title
//             </Typography>
//             <Controller
//               name="title"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   fullWidth
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message?.toString() || ""}
//                 />
//               )}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Controller
//               name="secureBookingIcon"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   value={field.value ?? ""}
//                   select
//                   label="Icon"
//                   size="small"
//                   sx={{ width: "120px" }}
//                 >
//                   {ICON_OPTIONS.map((opt) => (
//                     <MenuItem key={opt.value} value={opt.value}>
//                       {opt.icon}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               )}
//             />

//             <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
//               <Controller
//                 name="secureBookingTitle"
//                 control={control}
//                 render={({ field, fieldState }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     // sx={{ mb: 2, mt: 4 }}
//                     placeholder="Enter secure Booking Title"
//                     error={!!fieldState.error}
//                     helperText={fieldState.error?.message}
//                   />
//                 )}
//               />
//             </Box>
//             <Controller
//               name="secureBooking"
//               control={control}
//               render={({ field }) => (
//                 <RichTextEditor
//                   content={field.value}
//                   onChange={field.onChange}
//                   minHeight={200}
//                 />
//               )}
//             />
//           </Grid>

//           {/* Reliable Service */}
//           <Grid item xs={12}>
//             <Controller
//               name="reliableServiceIcon"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   value={field.value ?? ""}
//                   onChange={(e) => field.onChange(e.target.value)}
//                   select
//                   label="Icon"
//                   size="small"
//                   sx={{ width: "100px" }}
//                 >
//                   {ICON_OPTIONS.map((opt) => (
//                     <MenuItem key={opt.value} value={opt.value}>
//                       {opt.icon}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               )}
//             />

//             <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
//               <Controller
//                 name="reliableServiceTitle"
//                 control={control}
//                 render={({ field, fieldState }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     // sx={{ mb: 2, mt: 4 }}
//                     placeholder="Enter Reliable Service Title"
//                     error={!!fieldState.error}
//                     helperText={fieldState.error?.message}
//                   />
//                 )}
//               />
//             </Box>
//             <Controller
//               name="reliableServices"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <>
//                   <RichTextEditor
//                     content={field.value}
//                     onChange={field.onChange}
//                     placeholder="Enter Reliable Service content..."
//                     minHeight={300}
//                   />
//                   {fieldState.error && (
//                     <Typography color="error" variant="body2" mt={1}>
//                       {fieldState.error.message}
//                     </Typography>
//                   )}
//                 </>
//               )}
//             />
//           </Grid>

//           {/* Customer Service */}
//           <Grid item xs={12}>
//             <Controller
//               name="customerServiceIcon"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   value={field.value ?? ""}
//                   onChange={(e) => field.onChange(e.target.value)}
//                   select
//                   label="Icon"
//                   size="small"
//                   sx={{ width: "100px" }}
//                 >
//                   {ICON_OPTIONS.map((opt) => (
//                     <MenuItem key={opt.value} value={opt.value}>
//                       {opt.icon}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               )}
//             />

//             <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
//               <Controller
//                 name="customerServiceTitle"
//                 control={control}
//                 render={({ field, fieldState }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     // sx={{ mb: 2, mt: 4 }}
//                     placeholder="Enter customer Services Title"
//                     error={!!fieldState.error}
//                     helperText={fieldState.error?.message}
//                   />
//                 )}
//               />
//             </Box>
//             <Controller
//               name="customerServices"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <>
//                   <RichTextEditor
//                     content={field.value}
//                     onChange={field.onChange}
//                     placeholder="Enter Customer Service content..."
//                     minHeight={300}
//                   />
//                   {fieldState.error && (
//                     <Typography color="error" variant="body2" mt={1}>
//                       {fieldState.error.message}
//                     </Typography>
//                   )}
//                 </>
//               )}
//             />
//           </Grid>

//           {/* Fair Price */}
//           <Grid item xs={12}>
//             <Controller
//               name="fairPriceIcon"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   select
//                   value={field.value ?? ""}
//                   onChange={(e) => field.onChange(e.target.value)}
//                   label="Icon"
//                   size="small"
//                   sx={{ width: "100px" }}
//                 >
//                   {ICON_OPTIONS.map((opt) => (
//                     <MenuItem key={opt.value} value={opt.value}>
//                       {opt.icon}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               )}
//             />

//             <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
//               <Controller
//                 name="fairPriceTitle"
//                 control={control}
//                 render={({ field, fieldState }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     // sx={{ mb: 2, mt: 4 }}
//                     placeholder="Enter fair Price Title"
//                     error={!!fieldState.error}
//                     helperText={fieldState.error?.message}
//                   />
//                 )}
//               />
//             </Box>
//             <Controller
//               name="fairPrice"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <>
//                   <RichTextEditor
//                     content={field.value}
//                     onChange={field.onChange}
//                     placeholder="Enter Fair Price content..."
//                     minHeight={300}
//                   />
//                   {fieldState.error && (
//                     <Typography color="error" variant="body2" mt={1}>
//                       {fieldState.error.message}
//                     </Typography>
//                   )}
//                 </>
//               )}
//             />
//           </Grid>

//           {/* Meta Title */}
//           <Grid item xs={12}>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontWeight: 600,
//                 mb: 1,
//                 color: "text.primary",
//               }}
//             >
//               Meta Title
//             </Typography>
//             <Controller
//               name="metaTitle"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   id="home-meta-title"
//                   {...field}
//                   fullWidth
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                 />
//               )}
//             />
//           </Grid>

//           {/* Meta Description */}
//           <Grid item xs={12}>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontWeight: 600,
//                 mb: 1,
//                 color: "text.primary",
//               }}
//             >
//               Meta Description
//             </Typography>
//             <Controller
//               name="metaDescription"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   id="home-meta-description"
//                   {...field}
//                   multiline
//                   rows={3}
//                   fullWidth
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                 />
//               )}
//             />
//           </Grid>

//           {/* Meta Keywords */}
//           <Grid item xs={12}>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontWeight: 600,
//                 mb: 1,
//                 color: "text.primary",
//               }}
//             >
//               Meta Keywords
//             </Typography>
//             <Controller
//               name="metaKeywords"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   id="home-meta-keywords"
//                   multiline
//                   rows={2}
//                   fullWidth
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                 />
//               )}
//             />
//           </Grid>

//           {/* Status */}
//           <Grid item xs={12}>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontWeight: 600,
//                 mb: 1,
//                 color: "text.primary",
//               }}
//             >
//               Status
//             </Typography>
//             <Controller
//               name="status"
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   select
//                   id="home-status"
//                   fullWidth
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                 >
//                   <MenuItem value="active">Active</MenuItem>
//                   <MenuItem value="inactive">Inactive</MenuItem>
//                 </TextField>
//               )}
//             />
//           </Grid>

//           {/* Submit */}
//           <Grid item xs={12} display="flex" justifyContent="flex-end">
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={isPending}
//               startIcon={isPending && <CircularProgress size={20} />}
//             >
//               {isPending ? "Saving..." : "Update Home Page"}
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </FormProvider>
//   );
// }
"use client";
import { useEffect } from "react";
import { Controller, useForm, FormProvider, Path } from "react-hook-form";
import {
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  Typography,
  Box,
  Divider,
  Paper,
  Chip,
} from "@mui/material";
import { SubmitHandler } from "react-hook-form";

import Grid from "@mui/material/GridLegacy";
import RichTextEditor from "@/src/components/common/Ui/Admin/RichTextEditor";
import { useTransition } from "react";
import FileUploadField from "@/src/components/common/Ui/Admin/FileUploadField";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomePageFormValues } from "../types/home.types";
import { homePageSchema } from "../validations/homeSchema";
import type { UpdatePageInput } from "@/src/actions/page/updatePage";
import { uploadPageImage } from "@/src/actions/page/uploadPageImage";
import { toast } from "react-toastify";
import {
  ICON_OPTIONS,
  getIconComponent,
} from "@/src/components/common/utils/iconMap";

type Props = {
  defaultValues: HomePageFormValues;
  onSave?: (data: UpdatePageInput) => Promise<{ success: boolean }>;
  pageId: number;
};

// ─────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────
function SectionHeader({
  label,
  hint,
  color = "#1976d2",
}: {
  label: string;
  hint?: string;
  color?: string;
}) {
  return (
    <Box mt={2} mb={2}>
      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
        <Box
          sx={{
            width: 4,
            height: 24,
            borderRadius: 1,
            background: color,
            flexShrink: 0,
          }}
        />
        <Typography variant="subtitle1" fontWeight={700} color={color}>
          {label}
        </Typography>
      </Box>
      {hint && (
        <Typography variant="caption" color="text.secondary" sx={{ pl: 1.5 }}>
          {hint}
        </Typography>
      )}
      <Divider sx={{ mt: 1 }} />
    </Box>
  );
}

// ─────────────────────────────────────────────
// FRONTEND HINT CHIP
// ─────────────────────────────────────────────
function FrontendHint({ text }: { text: string }) {
  return (
    <Chip
      label={`Frontend: ${text}`}
      size="small"
      variant="outlined"
      sx={{
        mb: 1,
        fontSize: "11px",
        color: "text.secondary",
        borderColor: "#ccc",
      }}
    />
  );
}

export default function HomePageSection({
  defaultValues,
  onSave,
  pageId,
}: Props) {
  const methods = useForm<HomePageFormValues>({
    defaultValues: {
      ...defaultValues,
    },
    resolver: zodResolver(homePageSchema),
    mode: "onChange",
  });
  const { control, handleSubmit, reset } = methods;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<HomePageFormValues> = (data) => {
    startTransition(async () => {
      if (!onSave) return;

      let imagePath: string | undefined = undefined;

      if (data.homeHeaderImage instanceof File) {
        const formData = new FormData();
        formData.append("image", data.homeHeaderImage);

        const uploadRes = await uploadPageImage(pageId, formData);
        if (uploadRes?.success && uploadRes.publicPath) {
          imagePath = uploadRes.publicPath;
        } else {
          toast.error("Image upload failed.");
          return;
        }
      } else if (typeof data.homeHeaderImage === "string") {
        imagePath = data.homeHeaderImage;
      } else {
        imagePath = (defaultValues.homeHeaderImage as string) || undefined;
      }

      const result = await onSave({
        ...data,
        title: data.title,
        imageUpload: imagePath,
        imageAlt: data.imageAlt,
        secureBooking: data.secureBooking,
        reliableService: data.reliableServices,
        secureBookingIcon: data.secureBookingIcon,
        reliableServiceIcon: data.reliableServiceIcon,
        customerServiceIcon: data.customerServiceIcon,
        fairPriceIcon: data.fairPriceIcon,
        secureBookingTitle: data.secureBookingTitle,
        reliableServiceTitle: data.reliableServiceTitle,
        customerServiceTitle: data.customerServiceTitle,
        fairPriceTitle: data.fairPriceTitle,
        customerService: data.customerServices,
        fairPrice: data.fairPrice,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        status: data.status,
        // ── NEW: Hero fields ──

        heroColorTitle: data.heroColorTitle,
        heroSubtitle: data.heroSubtitle,
        heroDescription: data.heroDescription,
        heroButtonText: data.heroButtonText,
        heroButtonLink: data.heroButtonLink,
        heroTrustText: data.heroTrustText,
        heroPoint1: data.heroPoint1,
        heroPoint2: data.heroPoint2,
        heroPoint3: data.heroPoint3,
        heroCard1Title: data.heroCard1Title,
        heroCard2Title: data.heroCard2Title,
        heroCard3Title: data.heroCard3Title,
        heroCardFootnote: data.heroCardFootnote,
      });

      if (result.success) {
        toast.success("Home page updated successfully!");
      }
    });
  };

  const IconTitleRow = ({
    name,
    iconName,
    placeholder,
  }: {
    name: Path<HomePageFormValues>;
    iconName: string;
    placeholder: string;
  }) => {
    const IconComponent = getIconComponent(iconName);
    return (
      <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
        <IconComponent sx={{ fontSize: 32, color: "#E7C27D" }} />
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              fullWidth
              placeholder={placeholder}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Box>
    );
  };

  return (
    <FormProvider {...methods}>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">Edit Home Page</Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* ════════════════════════════════════
              ORIGINAL FIELDS — COMPLETELY UNCHANGED
          ════════════════════════════════════ */}
          <Grid item xs={12}>
            <Controller
              name="homeHeaderImage"
              control={control}
              render={({ field, fieldState }) => (
                <FileUploadField
                  label="Header Image"
                  accept="image/*"
                  files={field.value || null}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  onChange={(files) => {
                    const file = Array.isArray(files) ? files[0] : files;
                    field.onChange(file ?? null);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="imageAlt"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  fullWidth
                  label="Image Alt Text"
                  placeholder="Enter image alt text"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Title
            </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message?.toString() || ""}
                />
              )}
            />
          </Grid> */}

          {/* ════════════════════════════════════════════════════
              ★ NEW — HERO SECTION FIELDS (added, nothing removed)
          ════════════════════════════════════════════════════ */}

          {/* Hero Headline */}
          <Grid item xs={12}>
            <SectionHeader label="Hero — Headline" color="#7B3F00" />
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Hero Title (black text)"
                        placeholder="e.g. Luxury Chauffeur Service"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="heroColorTitle"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Hero Colored Title (gold italic)"
                        placeholder="e.g. in Paris"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="heroSubtitle"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Hero Subtitle (bold line below headline)"
                        placeholder="e.g. Premium Airport Transfers, Business & Private Chauffeur Services"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="heroDescription"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        multiline
                        rows={3}
                        label="Hero Description (paragraph below subtitle)"
                        placeholder="e.g. Travel in comfort, discretion and elegance meet..."
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Hero CTA Button */}
          <Grid item xs={12}>
            <SectionHeader
              label='Hero — CTA Button ("Book Your Chauffeur")'
              color="#7B3F00"
            />
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="heroButtonText"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Button Text"
                        placeholder="e.g. Book Your Chauffeur"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="heroButtonLink"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Button Link (URL)"
                        placeholder="e.g. /booking or https://..."
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Trust Bar + Points */}
          <Grid item xs={12}>
            <SectionHeader
              label="Hero — Trust Bar & Feature Points"
              color="#7B3F00"
            />
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="heroTrustText"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Trust Text (next to ★★★★★)"
                        placeholder="e.g. Trusted by international travelers"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="heroPoint1"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Feature Point 1"
                        placeholder="e.g. Fixed price"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="heroPoint2"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Feature Point 2"
                        placeholder="e.g. No hidden fees"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="heroPoint3"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Feature Point 3"
                        placeholder="e.g. Instant confirmation"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Hero Info Cards */}
          <Grid item xs={12}>
            <SectionHeader label="Hero — 3-Column Info Cards" color="#7B3F00" />
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={3}>
                {/* Card 1 */}
                <Grid item xs={12} md={4}>
                  <Controller
                    name="heroCard1Title"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Card 1 Title (bold)"
                        placeholder="e.g. Familie nare"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                {/* Card 2 */}
                <Grid item xs={12} md={4}>
                  <Controller
                    name="heroCard2Title"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Card 2 Title (bold)"
                        placeholder="e.g. Airport Routes"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                {/* Card 3 */}
                <Grid item xs={12} md={4}>
                  <Controller
                    name="heroCard3Title"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Card 3 Title (bold)"
                        placeholder="e.g. poplaste"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                {/* Footnote */}
                <Grid item xs={12}>
                  <Controller
                    name="heroCardFootnote"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        value={field.value ?? ""}
                        fullWidth
                        label="Cards Footnote (small text below cards)"
                        placeholder="e.g. Tie rasy Postpace & Inetger anesuitsation gonarnment"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          mb: 1.5,
                          "& .MuiInputBase-input": {
                            color: "black",
                          },
                          "& .MuiInputLabel-root": {
                            color: "gray",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "gray",
                            },
                            "&:hover fieldset": {
                              borderColor: "darkgray",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "gray",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="secureBookingIcon"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  select
                  label="Icon"
                  size="small"
                  sx={{ width: "120px" }}
                >
                  {ICON_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.icon}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
              <Controller
                name="secureBookingTitle"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter secure Booking Title"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Controller
              name="secureBooking"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value ?? ""} // content={field.value}
                  onChange={field.onChange}
                  minHeight={200}
                />
              )}
            />
          </Grid>

          {/* Reliable Service */}
          <Grid item xs={12}>
            <Controller
              name="reliableServiceIcon"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  select
                  label="Icon"
                  size="small"
                  sx={{ width: "100px" }}
                >
                  {ICON_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.icon}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
              <Controller
                name="reliableServiceTitle"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter Reliable Service Title"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Controller
              name="reliableServices"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <RichTextEditor
                    content={field.value ?? ""} // content={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Reliable Service content..."
                    minHeight={300}
                  />
                  {fieldState.error && (
                    <Typography color="error" variant="body2" mt={1}>
                      {fieldState.error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12}>
            <Controller
              name="customerServiceIcon"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  select
                  label="Icon"
                  size="small"
                  sx={{ width: "100px" }}
                >
                  {ICON_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.icon}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
              <Controller
                name="customerServiceTitle"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter customer Services Title"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Controller
              name="customerServices"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <RichTextEditor
                    content={field.value ?? ""} //  content={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Customer Service content..."
                    minHeight={300}
                  />
                  {fieldState.error && (
                    <Typography color="error" variant="body2" mt={1}>
                      {fieldState.error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>

          {/* Fair Price */}
          <Grid item xs={12}>
            <Controller
              name="fairPriceIcon"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Icon"
                  size="small"
                  sx={{ width: "100px" }}
                >
                  {ICON_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.icon}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Box display="flex" alignItems="center" gap={1} mt={2} mb={1}>
              <Controller
                name="fairPriceTitle"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter fair Price Title"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>
            <Controller
              name="fairPrice"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <RichTextEditor
                    content={field.value ?? ""} //  content={field.value}
                    onChange={field.onChange}
                    placeholder="Enter Fair Price content..."
                    minHeight={300}
                  />
                  {fieldState.error && (
                    <Typography color="error" variant="body2" mt={1}>
                      {fieldState.error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>

          {/* Meta Title */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Meta Title
            </Typography>
            <Controller
              name="metaTitle"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  id="home-meta-title"
                  {...field}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Meta Description */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Meta Description
            </Typography>
            <Controller
              name="metaDescription"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  id="home-meta-description"
                  {...field}
                  multiline
                  rows={3}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Meta Keywords */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Meta Keywords
            </Typography>
            <Controller
              name="metaKeywords"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="home-meta-keywords"
                  multiline
                  rows={2}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              Status
            </Typography>
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  id="home-status"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Submit */}
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              startIcon={isPending && <CircularProgress size={20} />}
            >
              {isPending ? "Saving..." : "Update Home Page"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
